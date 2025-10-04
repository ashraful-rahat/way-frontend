declare module "react-quill-next" {
  import { Component } from "react";

  export interface ReactQuillProps {
    value: string;
    onChange: (value: string) => void;
    theme?: string;
    readOnly?: boolean;
    formats?: string[];
    modules?: object;
  }

  export default class ReactQuill extends Component<ReactQuillProps> {}
}
