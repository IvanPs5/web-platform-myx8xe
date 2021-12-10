$(document).ready(function () {
  $('.btn.btn--large').click(function () {
    createListRow();
    updateFooterText();
  });

  $('.todo-component__footer .btn').click(function () {
    clearList();
    updateFooterText();
  });

  $('.list_button').click(function () {
    let action = $(this).find('i')[0];
    showTasks($(action).attr('class'));
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
    let inptuValue = $('#add-new-todo').val();
    if (!inptuValue === null && !inptuValue === '') {
      let list = $('.todo-component__list');

      let row = $('<li>').attr('class', 'todo-component__list-row');
      row.on('click', function () {
        activateCheckbox($(this).find('input'));
      });

      let textDiv = $('<div>').attr('class', 'todo-component__list-row-text');
      let checkbox = $('<input>')
        .attr('class', 'todo-component__checkbox')
        .attr('type', 'checkbox');
      checkbox.on('click', function () {
        activateCheckbox($(this));
      });
      let label = $('<label>').attr('class', 'todo-component__label');
      label.append(checkbox);
      label.append(inptuValue);
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

  function showTasks(hasClass) {
    let isCompletedTasks = hasClass === 'fas fa-tasks';
    let isPendingTasks = hasClass === 'fas fa-list';

    $('.todo-component__checkbox').each(function () {
      let retValue = undefined;

      let task = $(this).parent().parent().parent();
      task.show();
      if (isCompletedTasks && $(this).prop('checked')) {
        retValue = true;
      } else {
        if (isCompletedTasks || (isPendingTasks && $(this).prop('checked'))) {
          task.hide();
        }
      }

      return retValue;
    });
  }
});
