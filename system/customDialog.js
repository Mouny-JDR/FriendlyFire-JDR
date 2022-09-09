export class CustomDialog extends Dialog {
    submit(button) {
        try {
          if (button.callback && button.callback(this.options.jQuery ? this.element : this.element[0]) !== false) this.close();
        } catch(err) {
          ui.notifications.error(err);
          throw new Error(err);
        }
      }
}