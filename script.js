$(document).ready(function () {
  $('.todo-component__footer .btn').click(function () {
    clearList();
    updateFooterText();
  });

  $('.todo-component__list_button').click(function () {
    const todoComponent = $(this).parents('.todo-component');
    todoComponent.removeClass('todo-component--showing-completed');
    todoComponent.removeClass('todo-component--showing-pending');
  });

  $('.todo-component__list_button--completed').click(function () {
    const todoComponent = $(this).parents('.todo-component');
    todoComponent.removeClass('todo-component--showing-pending');
    todoComponent.addClass('todo-component--showing-completed');
  });

  $('.todo-component__list_button--pending').click(function () {
    const todoComponent = $(this).parents('.todo-component');
    todoComponent.removeClass('todo-component--showing-completed');
    todoComponent.addClass('todo-component--showing-pending');
  });

  $('.btn--large-delete').on('click', function () {
    removeListRow($(this).parents('.todo-component__list-row'));
  });

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
        this.element.addClass('todo-component__input-area');
        const form = $('<form/>', {
          action: '',
          class: 'todo-component__form',
        }).appendTo(this.element);
        const div = $('<div/>', {
          class: 'todo-component__input-area',
        }).appendTo(form);
        const input = $('<input>', {
          class: 'todo-component__input',
          placeholder: 'Add your new todo',
        }).appendTo(div);
        const btn = $('<button/>', {
          type: 'submit',
          text: '+',
          class: 'btn btn--large',
        }).appendTo(div);
      },
      _setOption: function (key, value) {
        if (key === 'value') {
        }
        this._super(key, value);
      },
      _setOptions: function (options) {
        this._super(options);
      },
      _destroy: function () {
        this.element.removeClass('todo-component__input-area').text('');
      },
    });
    $('#my-widget1').inputTasks();

    $('.todo-component__form').on('submit', function (event) {
      event.preventDefault();
      createListRow();
      updateFooterText();
    });
  });
});
