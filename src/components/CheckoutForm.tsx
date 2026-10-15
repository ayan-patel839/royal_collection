'use client';
import { useActionState } from 'react';
import { submitCheckout } from '@/actions/checkoutAction';

// Define form state interface for type-safe server actions

type FormState = {
  errors?: {
    fullName?: string[];
  };
  success?: boolean;
  message?: string;
};

export default function CheckoutForm() {
  // Explicitly cast initial state to FormState to satisfy TypeScript definitions
  const [state, formAction, isPending] = useActionState(submitCheckout, {} as FormState);

  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-md mx-auto p-4">
      <div>
        <input
          name="fullName"
          placeholder="Aapka Poora Naam"
          className="border p-2 rounded w-full"
        />

        {/* Render validation errors for the fullName field */}
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