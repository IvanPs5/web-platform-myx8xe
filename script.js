$(document).ready(function () {
  $(document).on('click', '.btn.btn--large-delete', function () {
    removeListRow();
  });

  $('.btn.btn--large-add').click(function () {
    createListRow();
    updateFooterText();
  });

  $('#clear-button').click(function () {
    clearList();
  });

  $(document).on('click', '.todo-component__checkbox', function () {
    updateFooterText();
  });

  $('#button-show-all-tasks').click(function () {
    showTasks('all');
  });

  $('#button-show-completed-tasks').click(function () {
    showTasks('completed');
  });

  $('#button-show-pending-tasks').click(function () {
    showTasks('pending');
  });

  function removeListRow() {
    let parent = $(this).parent();
    parent.remove();
    updateFooterText();
  }
  function createListRow() {
    let list = $('.todo-component__list');

    let line = document.createElement('li');
    line.className = 'todo-component__list-row';

    let textDiv = document.createElement('div');
    textDiv.className = 'todo-component__list-row-text';

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-component__checkbox';
    let checkboxValue = 'g';
    checkbox.value = checkboxValue;

    let text = document.createElement('label');
    text.innerHTML = $('#add-new-todo').val();
    text.className = 'todo-component__text';
    text.htmlFor = checkboxValue;

    textDiv.append(checkbox);
    textDiv.append(text);

    let buttonDelete = document.createElement('button');
    buttonDelete.className = 'btn btn--large-delete';

    let iconButton = document.createElement('i');
    iconButton.className = 'fas fa-trash';

    buttonDelete.append(iconButton);
    line.append(textDiv);
    line.append(buttonDelete);
    list.append(line);
  }

  function clearList() {
    let list = $('.todo-component__list');
    list.empty();
    updateFooterText();
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
