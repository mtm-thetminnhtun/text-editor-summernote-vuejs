Vue.component("summernote", {
  template: '<textarea :name="name"></textarea>',

  props: {
    model: {
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    config: {
      type: Object,
      default: {},
    },
  },

  mounted() {
    let vm = this;
    let config = this.config;

    config.callbacks = {
      onInit: function () {
        $(vm.$el).summernote("code", vm.model);
      },

      onChange: function () {
        vm.$emit("change", $(vm.$el).summernote("code"));
      },

      onBlur: function () {
        vm.$emit("change", $(vm.$el).summernote("code"));
      },
    };

    $(this.$el).summernote(config);
  },
});

new Vue({
  el: "#app",
  data: {
    content: null,
    // ↓ It is what the configuration object looks like. ↓
    config: {
      height: 100,
      toolbar: [
        // [groupName, [list of button]]
        ["style", ["bold", "italic", "underline", "clear"]],
        ["font", ["strikethrough", "superscript", "subscript"]],
        ["fontsize", ["fontsize"]],
        ["color", ["color"]],
        ["para", ["ul", "ol", "paragraph"]],
        ["insert", ["picture", "link", "video", "table", "hr"]], // plugin config: summernote-ext-codewrapper
      ],
    },
  },
});
