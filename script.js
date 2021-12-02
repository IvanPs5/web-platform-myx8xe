$(document).ready(function () {
  $(document).on('click', '.todo-component__button--delete', function () {
    let parent = $(this).parent();
    parent.remove();
    updateFooterText();
  });

  $('.todo-component__button--add').click(function () {
    let list = $('.todo-component__list');
    let line = document.createElement('li');
    line.className = 'todo-component__list-row';
    let textDiv = document.createElement('div');
    textDiv.className = 'todo-component__list-row-text';
    let checkbox = document.createElement('input');
    let text = document.createElement('span');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-component__checkbox';
    let inputText = $('#add-new-todo').val();
    text.innerHTML = inputText;
    text.className = 'todo-component__text';
    textDiv.append(checkbox);
    textDiv.append(text);
    let buttonDelete = document.createElement('button');
    buttonDelete.className =
      'todo-component__button todo-component__button--delete';
    let iconButton = document.createElement('i');
    iconButton.className = 'fas fa-trash';
    buttonDelete.append(iconButton);
    line.append(textDiv);
    line.append(buttonDelete);
    list.append(line);
    updateFooterText();
  });

  $('#clear-button').click(function () {
    let list = $('.todo-component__list');
    list.empty();
    updateFooterText();
  });

  function updateFooterText() {
    let sizeList =
      $('.todo-component__list').children().length -
      howManyCheckboxAreChecked();
    let footerText;
    if (sizeList === 1) {
      footerText = 'You have ' + sizeList + ' pending task.';
    } else {
      footerText = 'You have ' + sizeList + ' pending tasks.';
    }
    document.getElementById('text_pending_task').innerHTML = footerText;
  }

  function howManyCheckboxAreChecked() {
    let checkboxesChecked = 0;
    $('.todo-component__checkbox:checked').each(function () {
      checkboxesChecked++;
    });
    return checkboxesChecked;
  }

  $(document).on('click', '.todo-component__checkbox', function () {
    updateFooterText();
  });

  $('#button-show-all-tasks').click(function () {
    showAllTasks();
  });
  function showAllTasks() {
    $('.todo-component__checkbox').each(function () {
      let task = $(this).parent().parent();
      task.show();
    });
  }
  $('#button-show-completed-tasks').click(function () {
    showAllTasks();
    $('.todo-component__checkbox').each(function () {
      if (!$(this).prop('checked')) {
        let taskPending = $(this).parent().parent();
        taskPending.hide();
      }
    });
  });

  $('#button-show-pending-tasks').click(function () {
    showAllTasks();
    $('.todo-component__checkbox:checked').each(function () {
      let taskCompleted = $(this).parent().parent();
      taskCompleted.hide();
    });
  });
});
