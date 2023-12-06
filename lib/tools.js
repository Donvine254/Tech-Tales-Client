import Header from "@editorjs/header";
import Image from "@editorjs/image";
import List from "@editorjs/list";
import Link from "@editorjs/link";
import embedUmd from "@editorjs/embed";
import quoteUmd from "@editorjs/quote";
const tools = {
  header: {
    class: Header,
    inlineToolbar: false,
  },
  image: {
    class: Image,
    inlineToolbar: false,
  },
  list: {
    class: List,
    inlineToolbar: false,
  },
  link: {
    class: Link,
    inlineToolbar: false,
  },
  embed: {
    class: embedUmd,
    inlineToolbar: false,
  },
  quote: {
    class: quoteUmd,
    inlineToolbar: false,
  },
};

export default tools;
