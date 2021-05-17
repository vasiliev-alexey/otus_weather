import {Component} from "./Component";
import {TemplateEngine} from "./TemplateEngine";

export class Render<State> {


    public renderComponent(component: Component<State>, rootElement: HTMLElement): void {
        const t: Record<string, unknown> = {};
        Object.entries(component.state).forEach((entry) => {
            t[entry[0]] = t[entry[1]];
        })
        rootElement.innerHTML = TemplateEngine.template(component.render(), t);
    }
}