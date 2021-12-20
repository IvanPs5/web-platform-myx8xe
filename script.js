$(document).ready(function () {
  $('.todo-component__footer .btn').click(function () {
    clearList();
    updateFooterText();
  });

  $('.todo-component__list_button').click(function () {
    showAllTasks($(this));
  });

  $('.todo-component__list_button--completed').click(function () {
    showCompletedTasks($(this));
  });

  $('.todo-component__list_button--pending').click(function () {
    showPendingTasks($(this));
  });

  $('.btn--large-delete').on('click', function () {
    removeListRow($(this).parents('.todo-component__list-row'));
  });

  function showAllTasks(target) {
    const todoComponent = target.parents('.todo-component');
    todoComponent.removeClass('todo-component--showing-completed');
    todoComponent.removeClass('todo-component--showing-pending');
  }

  function showCompletedTasks(target) {
    const todoComponent = target.parents('.todo-component');
    todoComponent.removeClass('todo-component--showing-pending');
    todoComponent.addClass('todo-component--showing-completed');
  }

  function showPendingTasks(target) {
    const todoComponent = target.parents('.todo-component');
    todoComponent.removeClass('todo-component--showing-completed');
    todoComponent.addClass('todo-component--showing-pending');
  }

  function activateCheckbox(checkbox) {
    let valueChecked = true;

    if (checkbox.prop('checked')) {
      valueChecked = false;
    }
    checkbox.prop('checked', valueChecked);
    const row = checkbox.parents('.todo-component__list-row');
    if (valueChecked) {
      row.removeClass('todo-component__list-row--pending');
      row.addClass('todo-component__list-row--completed');
    } else {
      row.removeClass('todo-component__list-row--completed');
      row.addClass('todo-component__list-row--pending');
    }
    updateFooterText();
  }

  function removeListRow(element) {
    element.remove();
    updateFooterText();
  }

  function createListRow() {
    const input = $('.todo-component__input-area').find(
      '.todo-component__input'
    );
    let inputValue = input.val().trim();
    if (inputValue !== '') {
      inputValue = $(input).val();
      const listElm = $('.todo-component__list');

      const rowElm = $('<li/>').addClass(
        'todo-component__list-row todo-component__list-row--pending'
      );
      rowElm.on('click', function () {
        activateCheckbox($(this).find('input'));
      });

      const textDivElm = $('<div/>').addClass('todo-component__list-row-text');
      const checkboxElm = $(
        '<input type="checkbox" class="todo-component__checkbox"/>'
      );

      const labelElm = $('<label/>').addClass('todo-component__label');
      labelElm.on('click', function () {
        activateCheckbox($(this).find('input'));
      });
      labelElm.append(checkboxElm);
      labelElm.append($('<div/>').text(inputValue));
      textDivElm.append(labelElm);

      const divWrapBtnElm = $('<div/>').addClass('todo-component__wrap-btn');
      const buttonDeleteElm = $('<button/>').addClass('btn btn--large-warning');
      const iconButtonElm = $('<i/>').addClass('fas fa-trash');
      buttonDeleteElm.append(iconButtonElm);
      buttonDeleteElm.on('click', function () {
        removeListRow($(this).parents('.todo-component__list-row'));
      });
      divWrapBtnElm.append(buttonDeleteElm);

      rowElm.append(textDivElm);
      rowElm.append(divWrapBtnElm);
      listElm.append(rowElm);

      $(input).val('');

      const todoComponentElm = input.parents('.todo-component');
      todoComponentElm.removeClass('todo-component--showing-completed');
      todoComponentElm.removeClass('todo-component--showing-pending');
    }
  }

  function clearList() {
    const list = $('.todo-component__list');
    list.empty();
  }

  function updateFooterText() {
    const sizeList =
      $('.todo-component__list').children().length - calculateCheckboxChecked();
    let footerText = 'You have ' + sizeList + ' pending tasks.';
    if (sizeList === 1) {
      footerText = 'You have ' + sizeList + ' pending task.';
    }
    const footerTextElm = $('.todo-component__footer').find('span');
    footerTextElm.text(footerText);
  }

  function calculateCheckboxChecked() {
    return $('.todo-component__checkbox:checked').length;
  }

  $.widget('custom.todo-component__input', {
    options: {
      textValue: '',
    },
    _create: function () {
      this.options.value = this._constrain(this.options.value);
      this.element.addClass('todo-component__input');
      this.refresh();
    },
    _setOption: function (key, value) {
      if (key === 'value') {
        value = this._constrain(value);
      }
      this._super(key, value);
    },
    _setOptions: function (options) {
      this._super(options);
      this.refresh();
    },
    _destroy: function () {
      this.element.removeClass('todo-component__input').text('');
    },
  });

  $(function () {
    $.widget('custom.inputTasks', {
      options: {},
      _create: function () {
        const formElm = $('<form/>', {
          action: '',
          class: 'todo-component__form',
        }).appendTo(this.element);
        const divElm = $('<div/>', {
          class: 'todo-component__input-area',
        }).appendTo(formElm);
        const inputElm = $('<input>', {
          class: 'todo-component__input',
          placeholder: 'Add your new todo',
        }).appendTo(divElm);
        const btnElm = $('<button/>', {
          type: 'submit',
          text: '+',
          class: 'btn btn--large',
        }).appendTo(divElm);
      },
      _setOption: function (key, value) {
        this._super(key, value);
      },
      _setOptions: function (options) {
        this._super(options);
      },
      _destroy: function () {
        this.element.removeClass('todo-component__input-area').text('');
      },
    });
    $('.todo-component__widget-input').inputTasks();

    $.widget('custom.listButtonsOrganizers', {
      options: {},
      _create: function () {
        this.element.addClass('todo-component__buttons-organizers');
        const ulElm = $('<ul/>', {
          class: 'todo-component__list-buttons',
        }).appendTo(this.element);
        ulElm.append(
          this._createNewLiWithBtn(
            'todo-component__list_button',
            'fas fa-th-list'
          )
        );

        ulElm.append(
          this._createNewLiWithBtn(
            'todo-component__list_button todo-component__list_button--completed',
            'fas fa-tasks'
          )
        );

        ulElm.append(
          this._createNewLiWithBtn(
            'todo-component__list_button todo-component__list_button--pending',
            'fas fa-list'
          )
        );
      },

      _setOptions: function (options) {
        this._super(options);
      },
      _createNewLiWithBtn: function (classNameBtn, classNameBtnIcon) {
        const btnElm = this._createNewBtn(classNameBtn, classNameBtnIcon);
        const liElm = $('<li/>', {
          class: 'todo-component__list-buttons-row',
        });
        btnElm.appendTo(liElm);
        return liElm;
      },
      _createNewBtn: function (className, classNameIcon) {
        const btnElm = $('<button/>', {
          class: '' + className,
          click: function () {
            showAllTasks(btnElm);
          },
        });
        if (
          className ===
          'todo-component__list_button todo-component__list_button--completed'
        ) {
          btnElm.click(function () {
            showCompletedTasks(btnElm);
          });
        }

        if (
          className ===
          'todo-component__list_button todo-component__list_button--pending'
        ) {
          btnElm.click(function () {
            showPendingTasks(btnElm);
          });
        }

        const iElm = $('<i/>', {
          class: '' + classNameIcon,
        }).appendTo(btnElm);
        return btnElm;
      },
      _destroy: function () {
        this.element.removeClass('todo-component__buttons-organizers').text('');
      },
    });

    $(
      '.todo-component__widget-list-buttons-organizers'
    ).listButtonsOrganizers();

    $('.todo-component__form').on('submit', function (event) {
      event.preventDefault();
      createListRow();
      updateFooterText();
    });
  });
});
