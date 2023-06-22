import  ReactMarkdown from "react-markdown"
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown"
import rehypeRaw from "rehype-raw";

interface Props extends ReactMarkdownOptions{
  className?: string
}

const Markdown = ({className,...Markdown}: Props) => {
    return (
      <div className="w-full prose prose-slate mt-8 mx-auto">
        <ReactMarkdown rehypePlugins={[rehypeRaw]} {...Markdown} />
      </div>
    )
}

export default Markdown