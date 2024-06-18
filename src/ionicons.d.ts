// src/ionicons.d.ts
declare namespace JSX {
    interface IntrinsicElements {
      'ion-icon': IonIconProps;
    }
  }
  
  interface IonIconProps extends React.HTMLAttributes<HTMLElement> {
    name: string;
  }
  