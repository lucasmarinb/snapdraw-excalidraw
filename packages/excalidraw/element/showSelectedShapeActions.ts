import type { NonDeletedExcalidrawElement } from "./types";
import { getSelectedElements } from "../scene";
import type { CustomTool, UIAppState } from "../types";

/**
 * The tool whose style controls the panel shows: the built-in tool a custom
 * tool is styled as (`styleAs`), otherwise the active tool itself.
 */
export const getStyleActiveTool = (
  activeTool: UIAppState["activeTool"],
  customTools?: readonly CustomTool[],
): UIAppState["activeTool"] => {
  const styleAs =
    activeTool.type === "custom"
      ? customTools?.find((tool) => tool.type === activeTool.customType)
          ?.styleAs
      : undefined;
  return styleAs
    ? { ...activeTool, type: styleAs, customType: null }
    : activeTool;
};

export const showSelectedShapeActions = (
  appState: UIAppState,
  elements: readonly NonDeletedExcalidrawElement[],
  customTools?: readonly CustomTool[],
) => {
  const activeTool = getStyleActiveTool(appState.activeTool, customTools);
  return Boolean(
    !appState.viewModeEnabled &&
      appState.openDialog?.name !== "elementLinkSelector" &&
      ((activeTool.type !== "custom" &&
        (appState.editingTextElement ||
          (activeTool.type !== "selection" &&
            activeTool.type !== "eraser" &&
            activeTool.type !== "hand" &&
            activeTool.type !== "laser"))) ||
        getSelectedElements(elements, appState).length),
  );
};
