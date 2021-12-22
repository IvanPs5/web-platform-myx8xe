$(document).ready(function () {
  $(function () {
    $.widget('custom.buttonList', {
      options: {
        classes: {
          listButtons: 'list-buttons',
          row: 'list-buttons-row',
          defaultListBtn: 'toolbar-btn',
          listBtnSelected: 'toolbar-btn--selected',
        },
        selectors: {
          defaultListBtn: '.toolbar-btn',
        },
        buttons: [],
        onButtonSelected: function (buttonIdx) {},
        selectedButtonIdx: 0,
      },
      _create: function () {
        const buttonListElm = this.element;

        const selectors = this.options.selectors;
        const classes = this.options.classes;
        const buttons = this.options.buttons;

        const ulElm = $('<ul/>', {
          class: classes.listButtons,
        });
        ulElm.appendTo(buttonListElm);

        for (let btnIdx = 0; btnIdx < buttons.length; btnIdx++) {
          const liElm = $('<li/>', {
            class: classes.row,
          });
          liElm.appendTo(ulElm);
          let classButton = classes.defaultListBtn;
          const iconButton = buttons[btnIdx];
          if (btnIdx === 0) {
            classButton = classButton + ' ' + classes.listBtnSelected;
          }
          const buttonElm = $('<button/>', {
            class: classButton,
          });
          this._on(buttonElm, {
            click: function () {
              $(selectors.defaultListBtn).removeClass(classes.listBtnSelected);
              buttonElm.addClass(classes.listBtnSelected);
              this.onButtonSelected(btnIdx);
            },
          });
          buttonElm.appendTo(liElm);
          const iElm = $('<i/>', {
            class: iconButton,
          });
          iElm.appendTo(buttonElm);
        }
      },
      onButtonSelected: function (buttonIdx) {
        this._setOption('selectedButtonIdx', buttonIdx);
        this.options.onButtonSelected(buttonIdx);
      },
      _setOption: function (key, value) {
        if (
          /selectedButtonIdx/.test(key) &&
          (value < 0 || value > this.options.buttons.length)
        ) {
          return;
        }
        this._super(key, value);
      },
    });

    $.widget('custom.todoComponent', {
      options: {
        classes: {
          showingPending: 'todo-component--showing-pending',
          showingCompleted: 'todo-component--showing-completed',
          listRow: 'todo-component__list-row',
          rowCompleted: 'todo-component__list-row--completed',
          listRowText: 'todo-component__list-row-text',
          warningBtn: 'btn btn--large-warning',
          checkbox: 'todo-component__checkbox',
          label: 'todo-component__label',
          wrapBtn: 'todo-component__wrap-btn',
          iconBtnTrash: 'fas fa-trash',
        },
        selectors: {
          form: '.todo-component__form',
          listButtons: '.todo-component__buttons-organizers',
          list: '.todo-component__list',
          listRow: '.todo-component__list-row',
          listRowCompleted: '.todo-component__list-row--completed',
          checkbox: '.todo-component__checkbox',
          checkboxChecked: '.todo-component__checkbox:checked',
          input: '.todo-component__input',
          defualtBtn: '.btn',
          warningBtn: '.btn.btn--large-warning',
          footerBtn: '.todo-component__footer .btn',
          footer: '.todo-component__footer',
        },
      },
      _create: function () {
        const todoComponentElm = this.element;
        const todoComponentWidget = this;
        const selectors = this.options.selectors;

        const formElm = todoComponentElm.find(selectors.form);
        this._on(formElm, {
          submit: '_submitForm',
        });

        const defaultListBtn = 'fas fa-th-list';
        const completedListBtn = 'fas fa-tasks';
        const pendingListBtn = 'fas fa-list';
        const widgetListBtn = todoComponentElm.find(selectors.listButtons);

        const viewButtons = [defaultListBtn, completedListBtn, pendingListBtn];
        widgetListBtn.buttonList({
          buttons: viewButtons,
          onButtonSelected: function (buttonIdx) {
            // TODO logic
            switch (buttonIdx) {
              case 0:
                todoComponentWidget._showAllTasks();
                break;
              case 1:
                todoComponentWidget._showCompletedTasks();
                break;
              case 2:
                todoComponentWidget._showPendingTasks();
                break;
            }
          },
        });

        const deleteBtnElm = todoComponentElm.find(selectors.warningBtn);
        this._on(deleteBtnElm, {
          click: '_deleteRow',
        });

        const footerBtnElm = todoComponentElm.find(selectors.footerBtn);
        this._on(footerBtnElm, {
          click: 'clearList',
        });
      },
      _showAllTasks: function () {
        const classes = this.options.classes;
        const todoComponentElm = this.element;

        todoComponentElm.removeClass(classes.showingCompleted);
        todoComponentElm.removeClass(classes.showingPending);
      },
      _showCompletedTasks: function () {
        const classes = this.options.classes;
        const todoComponentElm = this.element;

        todoComponentElm.removeClass(classes.showingPending);
        todoComponentElm.addClass(classes.showingCompleted);
      },
      _showPendingTasks: function () {
        const classes = this.options.classes;
        const todoComponentElm = this.element;

        todoComponentElm.removeClass(classes.showingCompleted);
        todoComponentElm.addClass(classes.showingPending);
      },
      _submitForm: function (event) {
        event.preventDefault();
        this._createNewTask();
        this._updateFooterText();
      },
      _deleteRow: function (event) {
        const target = event.target;
        const selectors = this.options.selectors;
        const rowElm = $(target).parents(selectors.listRow);
        rowElm.remove();
        this._updateFooterText();
      },
      _createNewTask: function () {
        const selectors = this.options.selectors;
        const classes = this.options.classes;
        const todoComponentElm = this.element;
        const inputElm = todoComponentElm.find(selectors.input);
        let inputValue = inputElm.val().trim();
        if (inputValue !== '') {
          inputValue = inputElm.val();
          const listElm = $(selectors.list);

          const rowElm = $('<li/>', {
            class: classes.listRow,
          });
          this._on(rowElm, {
            click: '_activateCheckbox',
          });

          const textDivElm = $('<div/>', {
            class: classes.listRowText,
          });
          const checkboxElm = $(
            '<input type="checkbox" class="todo-component__checkbox"/>'
          );

          const labelElm = $('<label/>', {
            class: classes.label,
          });
          this._on(labelElm, {
            click: '_activateCheckbox',
          });
          labelElm.append(checkboxElm);
          labelElm.append($('<div/>').text(inputValue));
          textDivElm.append(labelElm);

          const divWrapBtnElm = $('<div/>', {
            class: classes.wrapBtn,
          });
          const buttonDeleteElm = $('<button/>', {
            class: classes.warningBtn,
          });
          const iconButtonElm = $('<i/>', {
            class: classes.iconBtnTrash,
          });
          buttonDeleteElm.append(iconButtonElm);
          this._on(buttonDeleteElm, {
            click: '_deleteRow',
          });
          divWrapBtnElm.append(buttonDeleteElm);

          rowElm.append(textDivElm);
          rowElm.append(divWrapBtnElm);
          listElm.append(rowElm);

          inputElm.val('');

          todoComponentElm.removeClass(classes.showingCompleted);
          todoComponentElm.removeClass(classes.showingPending);
        }
      },
      _activateCheckbox: function (event) {
        const target = event.target;
        const selectors = this.options.selectors;
        const classes = this.options.classes;
        const row = $(target).parents(selectors.listRow);
        let checkbox = row.find(selectors.checkbox);
        let valueChecked = true;

        if (checkbox.prop('checked')) {
          valueChecked = false;
        }
        checkbox.prop('checked', valueChecked);
        if (valueChecked) {
          row.addClass(classes.rowCompleted);
        } else {
          row.removeClass(classes.rowCompleted);
        }
        this._updateFooterText();
      },
      _updateFooterText: function () {
        const selectors = this.options.selectors;
        const sizeList =
          this.element.find(selectors.list).children().length -
          this._calculateCheckboxChecked();
        let footerText = 'You have ' + sizeList + ' pending tasks.';
        if (sizeList === 1) {
          footerText = 'You have ' + sizeList + ' pending task.';
        }
        const footerTextElm = $(selectors.footer).find('span');
        footerTextElm.text(footerText);
      },
      _calculateCheckboxChecked: function () {
        return this.element.find(this.options.selectors.checkboxChecked).length;
      },
      clearList: function () {
        const list = this.element.find(this.options.selectors.list);
        list.empty();
        this._updateFooterText();
      },
    });
    $('.todo-component').todoComponent();
  });
});
