import { cn } from '@/lib/utils';

export interface PasswordCheckIndicatorProps {
  numberOfChecks: bigint;
  colorUnchecked: string;
  colorChecked: string;
  className?: string;
}

const PasswordCheckIndicator = ({
  numberOfChecks,
  colorUnchecked,
  colorChecked,
  className
}: PasswordCheckIndicatorProps) => {
  return (
    <div className={cn("flex flex-row gap-2 pt-2 pb-2", className!)}>
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="flex-grow h-1 rounded-full" style={{backgroundColor: numberOfChecks > index ? colorChecked : colorUnchecked}}
        />
      ))}
    </div>
  );
};

export default PasswordCheckIndicator;