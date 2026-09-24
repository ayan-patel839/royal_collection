'use client';
import { useActionState } from 'react';
import { submitCheckout } from '@/actions/checkoutAction';

// 1. Ek Type bana lijiye taaki TypeScript ko pata chale ki state mein kya aayega
type FormState = {
  errors?: {
    fullName?: string[];
  };
  success?: boolean;
  message?: string;
};

export default function CheckoutForm() {
  // 2. Yahan {} ke aage 'as FormState' lagana zaruri hai
  const [state, formAction, isPending] = useActionState(submitCheckout, {} as FormState);

  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-md mx-auto p-4">
      <div>
        <input 
          name="fullName" 
          placeholder="Aapka Poora Naam" 
          className="border p-2 rounded w-full"
        />
        
        {/* Ab yahan fullName spelling same honi chahiye */}
        {state.errors?.fullName && (
          <p className="text-red-500 text-sm mt-1">{state.errors.fullName[0]}</p>
        )}
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className="bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
      >
        {isPending ? 'Check ho raha hai...' : 'Submit'}
      </button>
    </form>
  );
}