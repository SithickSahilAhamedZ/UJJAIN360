// FIX: Import 'react' to make the JSX namespace available for augmentation of custom elements.
import * as React from 'react';

// Allow using <iconify-icon> custom element in JSX
declare global {
  // Add a global type declaration for the Leaflet library
  var L: any;
  namespace JSX {
    interface IntrinsicElements {
      // FIX: Use React.DetailedHTMLProps for a more robust custom element type definition, resolving issues where the custom element was not recognized.
      'iconify-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        icon: string;
        // For the 'iconify-icon' web component, the 'class' attribute must be used instead of 'className'.
        class?: string;
      };
    }
  }
}

export type Page = 'dashboard' | 'incidents' | 'booking' | 'alerts' | 'analytics' | 'reports';

export interface NavItem {
  id: Page;
  label: string;
  // Icon is now optional to support different navigation styles
  icon?: any; // was ReactElement
}

export type IncidentPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type IncidentStatus = 'OPEN' | 'IN PROGRESS' | 'RESOLVED';

export interface Incident {
  id: string;
  title: string;
  description: string;
  location: string;
  priority: IncidentPriority;
  status: IncidentStatus;
  timestamp: string;
  reportedTime: string;
  assignedTo: string;
}


export interface Complaint {
  id: string;
  user: string;
  details: string;
  timestamp: string;
  status: 'Open' | 'Closed';
}