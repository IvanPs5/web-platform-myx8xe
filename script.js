$(document).ready(function () {
  $('.row__hover-button').click(function () {
    let parent = $(this).parent();
    parent.remove();
  });

  $('.addon__button').click(function () {
    let list = $('.todo-component__list');
    let line = document.createElement('li');
    line.className = 'list__row';
    let textDiv = document.createElement('div');
    textDiv.className = 'row__text';
    let checkbox = document.createElement('input');
    let text = document.createElement('span');
    checkbox.type = 'checkbox';
    checkbox.className = 'text__checkbox';
    let inputText = $('#addNewTodo').val();
    text.innerHTML = inputText;
    textDiv.append(checkbox);
    textDiv.append(text);
    let buttonDelete = document.createElement('button');
    buttonDelete.className = 'row__hover-button';
    line.append(textDiv);
    line.append(buttonDelete);
    list.append(line);
  });

  $('.list__hover-button').click(function () {
    let parent = $(this).parent();
    parent.remove();
  });
});

$(document).on(function () {
  $('.row__hover-button').click(function () {
    let parent = $(this).parent();
    parent.remove();
  });
});
