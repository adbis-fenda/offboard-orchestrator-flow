
import { toast as sonnerToast } from 'sonner';

// Re-export from toast.tsx
export { 
  useToast,
  toast
} from '@/components/ui/toast';

// Also re-export sonner toast to use if needed
export const sonner = sonnerToast;
