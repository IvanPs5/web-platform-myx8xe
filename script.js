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

  $('.todo-component__form').on('submit', function (event) {
    event.preventDefault();
    createListRow();
    updateFooterText();
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
      const list = $('.todo-component__list');

      const row = $('<li>').addClass(
        'todo-component__list-row todo-component__list-row--pending'
      );
      row.on('click', function () {
        activateCheckbox($(this).find('input'));
      });

      const textDiv = $('<div>').addClass('todo-component__list-row-text');
      const checkbox = $(
        '<input type="checkbox" class="todo-component__checkbox"/>'
      );

      const label = $('<label>').addClass('todo-component__label');
      label.on('click', function () {
        activateCheckbox($(this).find('input'));
      });
      label.append(checkbox);
      label.append($('<div/>').text(inputValue));
      textDiv.append(label);

      const divWrapBtn = $('<div>').addClass('todo-component__wrap-btn');
      const buttonDelete = $('<button>').addClass('btn btn--large-warning');
      const iconButton = $('<i>').addClass('fas fa-trash');
      buttonDelete.append(iconButton);
      buttonDelete.on('click', function () {
        removeListRow($(this).parents('.todo-component__list-row'));
      });
      divWrapBtn.append(buttonDelete);

      row.append(textDiv);
      row.append(divWrapBtn);
      list.append(row);

      $(input).val('');

      const todoComponent = input.parents('.todo-component');
      todoComponent.removeClass('todo-component--showing-completed');
      todoComponent.removeClass('todo-component--showing-pending');
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
});
