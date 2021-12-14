$(document).ready(function () {
  $('.todo-component .btn.btn--large').click(function () {
    createListRow();
    updateFooterText();
  });

  $('.todo-component__footer .btn').click(function () {
    clearList();
    updateFooterText();
  });

  $('.todo-component__list_button').click(function () {
    showTasks($(this));
  });

  $('.todo-component__laist_button--completed').click(function () {
    showTasks($(this));
  });

  $('.todo-component__list_button--pending').click(function () {
    showTasks($(this));
  });

  $('.btn--large-delete').on('click', function () {
    removeListRow($(this).parent());
  });

  function activateCheckbox(checkbox) {
    let valueChecked = true;
    if (checkbox.prop('checked')) {
      valueChecked = false;
    }
    checkbox.prop('checked', valueChecked);
    updateFooterText();
  }

  function removeListRow(element) {
    element.remove();
    updateFooterText();
  }

  function createListRow() {
    let input = $('.todo-component__input-area').find(
      '.todo-component__input'
    )[0];
    inputValue = $(input).val().trim();

    if (inputValue !== null && inputValue != '') {
      inputValue = $(input).val();
      let list = $('.todo-component__list');

      let row = $('<li>').attr('class', 'todo-component__list-row');
      row.on('click', function () {
        activateCheckbox($(this).find('input'));
      });

      let textDiv = $('<div>').attr('class', 'todo-component__list-row-text');
      let checkbox = $('<input>')
        .attr('class', 'todo-component__checkbox')
        .attr('type', 'checkbox');

      let label = $('<label>').attr('class', 'todo-component__label');
      label.on('click', function () {
        activateCheckbox($(this).find('input'));
      });
      label.append(checkbox);
      label.append(inputValue);
      textDiv.append(label);

      let buttonDelete = $('<button>').attr('class', 'btn btn--large-warning');
      let iconButton = $('<i>').attr('class', 'fas fa-trash');
      buttonDelete.append(iconButton);
      buttonDelete.on('click', function () {
        removeListRow($(this).parent());
      });

      row.append(textDiv);
      row.append(buttonDelete);
      list.append(row);
    }
    $(input).val('');
  }

  function clearList() {
    let list = $('.todo-component__list');
    list.empty();
  }

  function updateFooterText() {
    let sizeList =
      $('.todo-component__list').children().length - calculateCheckboxChecked();
    let footerText = 'You have ' + sizeList + ' pending tasks.';
    if (sizeList === 1) {
      footerText = 'You have ' + sizeList + ' pending task.';
    }
    let footer = $('.todo-component__footer').find('span')[0];
    $(footer).text(footerText);
  }

  function calculateCheckboxChecked() {
    let checkboxesChecked = 0;
    $('.todo-component__checkbox:checked').each(function () {
      checkboxesChecked++;
    });
    return checkboxesChecked;
  }

  function showTasks(target) {
    let hasClass = $(target).attr('class');

    let isCompletedTasks =
      hasClass === 'todo-component__list_button--completed';
    let isPendingTasks = hasClass === 'todo-component__list_button--pending';

    $('.todo-component__checkbox').each(function () {
      let retValue = undefined;

      let task = $(this).parents('.todo-component__list-row')[0];
      if (task == null) {
        task = $(this).parents('.todo-component__list-row--hidden')[0];
      }

      $(task).attr('class', 'todo-component__list-row');
      if (isCompletedTasks && $(this).prop('checked')) {
        retValue = true;
      } else {
        if (isCompletedTasks || (isPendingTasks && $(this).prop('checked'))) {
          $(task).attr('class', 'todo-component__list-row--hidden');
        }
      }

      return retValue;
    });
  }
});
