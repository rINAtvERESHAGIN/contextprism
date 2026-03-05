import { PropsWithChildren } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

interface SidebarFormValues {
  llmModel: '';
  search: '';
}

const Form = styled('form')`
  width: 100%;
  box-sizing: border-box;
  border-right: 1px solid;
  border-color: #e5e7eb;
  background-color: #fff;
`;

interface SidebarFormProps {
  onSubmit: (searchAiInput: string, confermedModel: string) => void;
}
export function SidebarForm({
  children,
  onSubmit,
}: PropsWithChildren<SidebarFormProps>) {
  const methods = useForm<SidebarFormValues>({
    mode: 'onChange',
    defaultValues: {
      llmModel: '',
      search: '',
    },
  });

  const onSubmitHandler: SubmitHandler<SidebarFormValues> = data => {
    const { search, llmModel } = data;
    if (search.trim()) {
      /**
       * https://ai-sdk.dev/docs/ai-sdk-ui/chatbot#setting-custom-body-fields-per-request
       */
      onSubmit(search, llmModel);
      methods.setValue('search', '');
    }
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmitHandler)}>{children}</Form>
    </FormProvider>
  );
}
