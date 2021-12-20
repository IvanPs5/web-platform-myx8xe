$(document).ready(function () {
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

  $(function () {
    $.widget('custom.todoComponent', {
      options: {},
      _create: function () {
        const todoComponent = this.element;
        const form = todoComponent.find('.todo-component__form');
        this._on(form, {
          submit: 'submitForm',
        });
        const btnOrganizer = todoComponent.find('.todo-component__list_button');
        this._on(btnOrganizer, {
          click: 'showAllTasks',
        });
        const btnOrganizerCompleted = todoComponent.find(
          '.todo-component__list_button--completed'
        );
        this._on(btnOrganizerCompleted, {
          click: 'showCompletedTasks',
        });
        const btnOrganizerPending = todoComponent.find(
          '.todo-component__list_button--pending'
        );
        this._on(btnOrganizerPending, {
          click: 'showPendingTasks',
        });
        const deleteBtn = todoComponent.find('.btn btn--large-warning');
        this._on(deleteBtn, {
          click: 'deleteRow',
        });
        const footerBtn = todoComponent.find('.todo-component__footer .btn');
        this._on(footerBtn, {
          click: 'clearList',
        });
      },
      showAllTasks: function () {
        const todoComponentElm = this.element;
        todoComponentElm.removeClass('todo-component--showing-completed');
        todoComponentElm.removeClass('todo-component--showing-pending');
      },
      showCompletedTasks: function () {
        const todoComponentElm = this.element;
        todoComponentElm.removeClass('todo-component--showing-pending');
        todoComponentElm.addClass('todo-component--showing-completed');
      },
      showPendingTasks: function () {
        const todoComponentElm = this.element;
        todoComponentElm.removeClass('todo-component--showing-completed');
        todoComponentElm.addClass('todo-component--showing-pending');
      },
      submitForm: function () {
        event.preventDefault();
        this.createNewTask();
        updateFooterText();
      },
      deleteRow: function () {
        removeListRow($(this).parents('.todo-component__list-row'));
      },
      createNewTask: function () {
        const todoComponentElm = this.element;
        const input = todoComponentElm.find('.todo-component__input');
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

          const textDivElm = $('<div/>').addClass(
            'todo-component__list-row-text'
          );
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

          const divWrapBtnElm = $('<div/>').addClass(
            'todo-component__wrap-btn'
          );
          const buttonDeleteElm = $('<button/>').addClass(
            'btn btn--large-warning'
          );
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

          todoComponentElm.removeClass('todo-component--showing-completed');
          todoComponentElm.removeClass('todo-component--showing-pending');
        }
      },
      clearList: function () {
        clearList();
        updateFooterText();
      },
      _destroy: function () {
        this.element.removeClass('todo-component').text('');
      },
    });
    $('.todo-component').todoComponent();
  });
});
