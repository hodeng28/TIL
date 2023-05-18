import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ImageUp from "../theme/icons/up.svg";
import ImageDown from "../theme/icons/down.svg";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import View from "@ckeditor/ckeditor5-ui/src/view";

class MoveImage extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add("moveImage", (locale) => {
      const view = new View(locale);
      const upView = new ButtonView(locale);
      const downView = new ButtonView(locale);

      upView.set({
        label: editor.locale.t("위로"),
        icon: ImageUp,
        tooltip: true,
      });

      downView.set({
        label: editor.locale.t("아래로"),
        icon: ImageDown,
        tooltip: true,
      });

      upView // Callback executed once the image is clicked.
        .on("execute", () => {
          // 현재 선택된 이미지 찾기

          editor.model.change((writer) => {
            const selection = editor.model.document.selection;
            const selectedElement = selection.getSelectedElement();
            const parent = selection.focus.parent;
            const selectedElementIndex = parent.getChildIndex(selectedElement);

            // 이미지 위치 조정
            if (selectedElementIndex > 0) {
              const newIndex = selectedElementIndex - 1;
              const newElement = parent.getChild(newIndex);

              writer.insert(selectedElement, newElement, "before");
            }
          });
        });

      downView // Callback executed once the image is clicked.
        .on("execute", () => {
          editor.model.change((writer) => {
            const selection = editor.model.document.selection;
            const selectedElement = selection.getSelectedElement();
            const parent = selection.focus.parent;
            const selectedElementIndex = parent.getChildIndex(selectedElement);

            // 이미지 위치 조정
            const newIndex = selectedElementIndex + 1;
            const newElement = parent.getChild(newIndex);

            if (newElement) {
              writer.insert(selectedElement, newElement, "after");
            }
          });
        });

      view.setTemplate({
        tag: "div",
        children: [upView, downView],
      });

      return view;
    });
  }
}

export default MoveImage;
