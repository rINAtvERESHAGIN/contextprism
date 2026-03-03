import { UIMessage } from 'ai';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { cn } from '../../../../shared/tools';

export function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user';

  const content = message.parts
    .filter(part => part.type === 'text')
    .map(part => {
      const text = part.text;
      if (text == null || typeof text !== 'string') {
        return '';
      }
      return text;
    })
    .join('');

  const displayContent = content.trim() === '' ? '▋' : content;

  return (
    <motion.div
      layout='position'
      className={cn(
        'max-w-[100%] rounded-2xl px-4 py-3 text-sm shadow-sm prose prose-sm break-words',
        isUser
          ? 'bg-primary text-primary-foreground prose-invert'
          : 'bg-muted prose-zinc'
      )}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                {...props}
                style={oneDark}
                language={match[1]}
                PreTag='div'
                customStyle={{
                  margin: '0.8rem 0',
                  borderRadius: '0.5rem',
                  fontSize: '0.9em',
                }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code
                {...props}
                className={cn(
                  className,
                  'bg-muted/60 px-1.5 py-0.5 rounded font-mono text-sm'
                )}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {displayContent}
      </ReactMarkdown>
    </motion.div>
  );
}
