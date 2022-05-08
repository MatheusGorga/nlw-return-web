import { AppWindow, ArrowLeft, Camera } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { feedbackType, feedbackTypes } from '..';
import { api } from '../../../lib/api';
import CloseButton from '../../CloseButton';
import Loading from '../../Loading';
import ScreenshotButton from '../ScreenshotButton';

interface FeedbackContentProps {
  feedbackType: feedbackType;
  onRestartFeedback: () => void;
  onFeedbackSent: () => void;
}

function FeedbackContentStep({
  feedbackType,
  onRestartFeedback,
  onFeedbackSent,
}: FeedbackContentProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleSubmitFeedback(e: FormEvent) {
    e.preventDefault();

    setIsSendingFeedback(true);

    await api.post('/feedbacks', {
      type: feedbackType,
      comment,
      screenshot,
    });

    onFeedbackSent();
    setIsSendingFeedback(false);
  }

  return (
    <>
      <header className=''>
        <button
          type='button'
          className='top-5  left-5 absolute text-zinc-400 hover:text-zinc-100'
          onClick={onRestartFeedback}
        >
          <ArrowLeft className='w-4 h-4' weight='bold' />
        </button>

        <span className='text-xl leading-6 flex items-center gap-2'>
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form className='my-4 w-full' onSubmit={handleSubmitFeedback}>
        <textarea
          className='min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1  focos:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin '
          placeholder='Conte com detalhes o que está acontecendo... '
          onChange={(e) => setComment(e.target.value)}
        />

        <footer className='flex gap-2 mt-2'>
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />

          <button
            type='submit'
            disabled={comment.length === 0 || isSendingFeedback}
            className='p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focos:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-offset-zinc-900  focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500'
          >
            {isSendingFeedback ? <Loading /> : 'Enviar Feedback'}
          </button>
        </footer>
      </form>
    </>
  );
}

export default FeedbackContentStep;
