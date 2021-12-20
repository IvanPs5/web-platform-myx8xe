$(document).ready(function () {
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
      showAllTasks: function (event) {
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
        this._updateFooterText();
      },
      deleteRow: function (event) {
        const target = event.target;
        const rowElm = $(target).parents('.todo-component__list-row');
        rowElm.remove();
        this._updateFooterText();
      },
      createNewTask: function () {
        const todoComponentElm = this.element;
        const input = todoComponentElm.find('.todo-component__input');
        let inputValue = input.val().trim();
        if (inputValue !== '') {
          inputValue = $(input).val();
          const listElm = $('.todo-component__list');

          const rowElm = $('<li/>', {
            class: 'todo-component__list-row todo-component__list-row--pending',
          });
          this._on(rowElm, {
            click: '_activateCheckbox',
          });

          const textDivElm = $('<div/>', {
            class: 'todo-component__list-row-text',
          });
          const checkboxElm = $(
            '<input type="checkbox" class="todo-component__checkbox"/>'
          );

          const labelElm = $('<label/>', {
            class: 'todo-component__label',
          });
          this._on(labelElm, {
            click: '_activateCheckbox',
          });
          labelElm.append(checkboxElm);
          labelElm.append($('<div/>').text(inputValue));
          textDivElm.append(labelElm);

          const divWrapBtnElm = $('<div/>', {
            class: 'todo-component__wrap-btn',
          });
          const buttonDeleteElm = $('<button/>', {
            class: 'btn btn--large-warning',
          });
          const iconButtonElm = $('<i/>', {
            class: 'fas fa-trash',
          });
          buttonDeleteElm.append(iconButtonElm);
          this._on(buttonDeleteElm, {
            click: 'deleteRow',
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
      _activateCheckbox: function (event) {
        const target = event.target;
        let checkbox = $(target).find('.todo-component__checkbox');
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
        this._updateFooterText();
      },
      _updateFooterText: function () {
        const sizeList =
          $('.todo-component__list').children().length -
          this._calculateCheckboxChecked();
        let footerText = 'You have ' + sizeList + ' pending tasks.';
        if (sizeList === 1) {
          footerText = 'You have ' + sizeList + ' pending task.';
        }
        const footerTextElm = $('.todo-component__footer').find('span');
        footerTextElm.text(footerText);
      },
      _calculateCheckboxChecked: function () {
        return $('.todo-component__checkbox:checked').length;
      },
      clearList: function () {
        const list = $('.todo-component__list');
        list.empty();
        this._updateFooterText();
      },
      _destroy: function () {
        this.element.removeClass('todo-component').text('');
      },
    });
    $('.todo-component').todoComponent();
  });
});
