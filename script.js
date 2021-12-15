$(document).ready(function () {
  $('.todo-component__footer .btn').click(function () {
    clearList();
    updateFooterText();
  });

  $('.todo-component__list_button').click(function () {
    showTasks($(this));
  });

  $('.todo-component__list_button--completed').click(function () {
    showTasks($(this));
  });

  $('.todo-component__list_button--pending').click(function () {
    showTasks($(this));
  });

  $('.btn--large-delete').on('click', function () {
    removeListRow($(this).parent());
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
    updateFooterText();
  }

  function removeListRow(element) {
    element.remove();
    updateFooterText();
  }

  function createListRow() {
    let input = $('.todo-component__input-area').find('.todo-component__input');
    inputValue = $(input).val().trim();
    if (inputValue !== null && inputValue != '') {
      inputValue = $(input).val();
      let list = $('.todo-component__list');

      let row = $('<li>').addClass('todo-component__list-row');
      row.on('click', function () {
        activateCheckbox($(this).find('input'));
      });

      let textDiv = $('<div>').addClass('todo-component__list-row-text');
      let checkbox = $('<input/>')
        .addClass('todo-component__checkbox')
        .attr('type', 'checkbox');

      let label = $('<label>').addClass('todo-component__label');
      label.on('click', function () {
        activateCheckbox($(this).find('input'));
      });
      label.append(checkbox);
      label.append($('<div/>').text(inputValue));
      label.append($('</label>'));
      textDiv.append(label);
      textDiv.append($('</div>'));

      let divWrapBtn = $('<div>').addClass('todo-component__wrap-btn');
      let buttonDelete = $('<button>').addClass('btn btn--large-warning');
      let iconButton = $('<i>').addClass('fas fa-trash');
      buttonDelete.append(iconButton);
      buttonDelete.append($('</i>'));
      buttonDelete.append($('</button>'));
      buttonDelete.on('click', function () {
        removeListRow($(this).parent());
      });
      divWrapBtn.append(buttonDelete);
      divWrapBtn.append($('</div>'));

      row.append(textDiv);
      row.append(divWrapBtn);
      row.append($('</li>'));
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
    let footerTextElm = $('.todo-component__footer').find('span');
    footerTextElm.text(footerText);
  }

  function calculateCheckboxChecked() {
    return $('.todo-component__checkbox:checked').length;
  }

  function showTasks(target) {
    const shouldShowCompleted = target.hasClass(
      'todo-component__list_button--completed'
    );
    const shouldShowPending = target.hasClass(
      'todo-component__list_button--pending'
    );

    $('.todo-component__checkbox').each(function () {
      const task = $(this).parents('.todo-component__list-row');
      task.removeClass('todo-component__list-row--hidden');

      const isChecked = $(this).prop('checked');
      if (
        (shouldShowCompleted && !isChecked) ||
        (shouldShowPending && isChecked)
      ) {
        $(task).addClass('todo-component__list-row--hidden');
      }
    });
  }
});
