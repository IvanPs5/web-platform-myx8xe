$(document).ready(function () {
  $(function () {
    $.widget('custom.buttonList', {
      options: {
        classes: {
          showingPending: 'todo-component--showing-pending',
          showingCompleted: 'todo-component--showing-completed',
        },
        selectors: {
          todoComponent: '.todo-component',
          defaultListBtn:
            '.toolbar-btn:not(.toolbar-btn--completed):not(.toolbar-btn--pending)',
          completedListBtn: '.toolbar-btn--completed',
          pendingListBtn: '.toolbar-btn--pending',
        },
        buttons: [],
        onButtonSelected: function (buttonIdx) {},
        selectedButtonIdx: 0,
      },
      _create: function () {
        const buttonListElm = this.element;

        const selectors = this.options.selectors;
        const buttons = this.options.buttons;

        for (let btnIdx = 0; btnIdx < buttons.length; btnIdx++) {
          const btnOrganizerElm = buttonListElm.find(buttons[btnIdx]);
          this._on(btnOrganizerElm, {
            click: function () {
              this.onButtonSelected(btnIdx);
            },
          });
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
          listRowPending:
            'todo-component__list-row todo-component__list-row--pending',
          rowCompleted: 'todo-component__list-row--completed',
          rowPending: 'todo-component__list-row--pending',
          listRowText: 'todo-component__list-row-text',
          warningBtn: 'btn btn--large-warning',
          checkbox: 'todo-component__checkbox',
          label: 'todo-component__label',
          wrapBtn: 'todo-component__wrap-btn',
          iconBtnTrash: 'fas fa-trash',
        },
        selectors: {
          form: '.todo-component__form',
          listButtons: '.todo-component__list-buttons',
          list: '.todo-component__list',
          listRow: '.todo-component__list-row',
          listRowCompleted: '.todo-component__list-row--completed',
          listRowPending: '.todo-component__list-row--pending',
          checkbox: '.todo-component__checkbox',
          input: '.todo-component__input',
          defualtBtn: '.btn',
          warningBtn: '.btn.btn--large-warning',
          footerBtn: '.todo-component__footer .btn',
          footer: '.todo-component__footer',
        },
      },
      _create: function () {
        const todoComponentElm = this.element;

        const selectors = this.options.selectors;

        const formElm = todoComponentElm.find(selectors.form);
        this._on(formElm, {
          submit: '_submitForm',
        });

        const defaultListBtn =
          '.toolbar-btn:not(.toolbar-btn--completed):not(.toolbar-btn--pending)';
        const completedListBtn = '.toolbar-btn--completed';
        const pendingListBtn = '.toolbar-btn--pending';
        const widgetListBtn = todoComponentElm.find(selectors.listButtons);

        const viewButtons = [defaultListBtn, completedListBtn, pendingListBtn];
        widgetListBtn.buttonList({
          buttons: ['fas fa-list', 'fas fa-bla', 'fas fl'],
          onButtonSelected: function (buttonIdx) {
            // TODO logic
            console.log(buttonIdx);
          },
        });
        this._on(widgetListBtn, {
          click: '_changeView',
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

      _submitForm: function (event) {
        event.preventDefault();
        this._createNewTask();
        this._updateFooterText();
      },
      _changeView: function (event) {
        const todoComponentElm = this.element;
        const selectors = this.options.selectors;

        const widgetListBtn = todoComponentElm.find(selectors.listButtons);
        //console.log(widgetListBtn);
        // console.log($(':ui-buttonList').buttonList('selectedButtonIdx'));
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
            class: classes.listRowPending,
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
        let checkbox = $(target).find(selectors.checkbox);
        let valueChecked = true;

        if (checkbox.prop('checked')) {
          valueChecked = false;
        }
        checkbox.prop('checked', valueChecked);
        const row = checkbox.parents(selectors.listRow);
        if (valueChecked) {
          row.removeClass(classes.rowPending);
          row.addClass(classes.rowCompleted);
        } else {
          row.removeClass(classes.rowCompleted);
          row.addClass(classes.rowPending);
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
        return this.element.find(this.options.selectors.list).length;
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
