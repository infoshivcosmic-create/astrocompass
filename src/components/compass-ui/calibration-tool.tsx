'use client';

import { RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface CalibrationToolProps {
  isCalibrated: boolean;
}

export function CalibrationTool({ isCalibrated }: CalibrationToolProps) {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="default" className="w-full rounded-full bg-primary/90 hover:bg-primary text-primary-foreground text-lg py-6">
            <RotateCw className="mr-2" /> Calibrate compass
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Compass Calibration</AlertDialogTitle>
            <AlertDialogDescription className="text-center space-y-4 pt-4">
              <p>
                To improve compass accuracy, please move your phone in a figure-eight pattern a few times.
              </p>
              <div className="flex justify-center">
                <svg width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="stroke-primary">
                    <path
                        d="M 30 40 A 20 20, 0, 1, 0, 70 40 A 20 20, 0, 1, 0, 30 40"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="188.5"
                        strokeDashoffset="188.5"
                    >
                        <animate attributeName="stroke-dashoffset" from="377" to="0" dur="4s" repeatCount="indefinite" />
                    </path>
                </svg>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="w-full">Got It</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {!isCalibrated && (
         <p className="text-xs text-muted-foreground">Calibration Recommended</p>
      )}
    </div>
  );
}
