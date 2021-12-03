$(document).ready(function () {
  $('.todo-component__list').on('click', '.btn--large-delete', function () {
    removeListRow($(this).parent());
    updateFooterText();
  });

  $('.btn.btn--large-add').click(function () {
    createListRow();
    updateFooterText();
  });

  $('#clear-button').click(function () {
    clearList();
    updateFooterText();
  });

  $('.todo-component__list').on(
    'click',
    '.todo-component__checkbox',
    function () {
      activateCheckbox($(this));
      updateFooterText();
    }
  );

  $('#button-show-all-tasks').click(function () {
    showTasks('all');
  });

  $('#button-show-completed-tasks').click(function () {
    showTasks('completed');
  });

  $('#button-show-pending-tasks').click(function () {
    showTasks('pending');
  });

  $('.todo-component__list').on(
    'click',
    '.todo-component__list-row-text',
    function () {
      activateCheckbox($(this).find('input'));
      updateFooterText();
    }
  );

  function activateCheckbox(checkbox) {
    let valueChecked = true;
    if (checkbox.prop('checked')) {
      valueChecked = false;
    }
    checkbox.prop('checked', valueChecked);
  }

  function removeListRow(element) {
    element.remove();
  }
  function createListRow() {
    let list = $('.todo-component__list');

    let row = $('<li>').attr('class', 'todo-component__list-row');

    let textDiv = $('<div>').attr('class', 'todo-component__list-row-text');
    let checkbox = $('<input>')
      .attr('class', 'todo-component__checkbox')
      .attr('type', 'checkbox');
    let text = $('<label>')
      .attr('class', 'todo-component__text')
      .text($('#add-new-todo').val());
    textDiv.append(checkbox);
    textDiv.append(text);

    let buttonDelete = $('<button>').attr('class', 'btn btn--large-delete');
    let iconButton = $('<i>').attr('class', 'fas fa-trash');
    buttonDelete.append(iconButton);

    row.append(textDiv);
    row.append(buttonDelete);
    list.append(row);
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
    $('#text_pending_task').text(footerText);
  }

  function calculateCheckboxChecked() {
    let checkboxesChecked = 0;
    $('.todo-component__checkbox:checked').each(function () {
      checkboxesChecked++;
    });
    return checkboxesChecked;
  }

  function showTasks(target) {
    var checkboxTarget = '.todo-component__checkbox';
    var isCompleted = target === 'completed';
    var isPending = target === 'pending';

    $(checkboxTarget).each(function () {
      let task = $(this).parent().parent();
      task.show();
      if (isCompleted && $(this).prop('checked')) {
        return true;
      }
      if (isCompleted || (isPending && $(this).prop('checked'))) {
        task.hide();
      }
    });
  }
});
