// Admin Data Service - Handles real-time data flow between users and admin

export interface UserReport {
  id: string;
  type: 'incident' | 'booking' | 'emergency' | 'feedback';
  title: string;
  description: string;
  location: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved';
  timestamp: Date;
  userInfo: {
    id: string;
    role: 'visitor' | 'security' | 'volunteer' | 'medical' | 'vendor';
  };
  attachments?: string[];
}

export interface AdminAction {
  id: string;
  reportId: string;
  action: 'acknowledged' | 'assigned' | 'resolved' | 'escalated';
  notes: string;
  assignedTo?: string;
  timestamp: Date;
}

export interface LiveMetrics {
  crowdCount: number;
  activeIncidents: number;
  responseTime: number;
  resolutionRate: number;
  userSatisfaction: number;
  areasStatus: {
    [key: string]: {
      count: number;
      capacity: number;
      status: 'low' | 'medium' | 'high' | 'critical';
    };
  };
}

class AdminDataService {
  private reports: UserReport[] = [];
  private actions: AdminAction[] = [];
  private metrics: LiveMetrics = {
    crowdCount: 12450,
    activeIncidents: 8,
    responseTime: 4.2,
    resolutionRate: 94,
    userSatisfaction: 4.8,
    areasStatus: {
      'mahakaleshwar-temple': { count: 15000, capacity: 20000, status: 'high' },
      'ram-ghat': { count: 8500, capacity: 12000, status: 'medium' },
      'main-entrance': { count: 3200, capacity: 8000, status: 'low' },
      'food-courts': { count: 12000, capacity: 15000, status: 'high' },
      'parking-areas': { count: 18000, capacity: 20000, status: 'critical' },
    }
  };

  private listeners: ((data: any) => void)[] = [];

  constructor() {
    // Initialize with some sample data
    this.initializeSampleData();
    // Simulate real-time updates
    this.startRealTimeUpdates();
  }

  private initializeSampleData() {
    // Add sample reports
    this.reports = [
      {
        id: '1',
        type: 'emergency',
        title: 'Medical Emergency',
        description: 'Person collapsed near temple entrance',
        location: 'Mahakaleshwar Temple - Main Gate',
        priority: 'critical',
        status: 'in-progress',
        timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        userInfo: { id: 'user123', role: 'visitor' },
      },
      {
        id: '2',
        type: 'incident',
        title: 'Lost Child',
        description: '8-year-old child separated from family',
        location: 'Ram Ghat Area',
        priority: 'high',
        status: 'open',
        timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
        userInfo: { id: 'security456', role: 'security' },
      },
      {
        id: '3',
        type: 'incident',
        title: 'Crowd Control Needed',
        description: 'Heavy congestion at Gate 2',
        location: 'Gate 2 - Main Entrance',
        priority: 'medium',
        status: 'resolved',
        timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        userInfo: { id: 'volunteer789', role: 'volunteer' },
      },
    ];
  }

  private startRealTimeUpdates() {
    // Update metrics every 5 seconds
    setInterval(() => {
      this.updateMetrics();
      this.notifyListeners('metricsUpdate', this.metrics);
    }, 5000);
  }

  private updateMetrics() {
    // Simulate real-time metric changes
    this.metrics.crowdCount += Math.floor(Math.random() * 20) - 10;
    this.metrics.activeIncidents = this.reports.filter(r => r.status !== 'resolved').length;
    
    // Update area status
    Object.keys(this.metrics.areasStatus).forEach(area => {
      const change = Math.floor(Math.random() * 100) - 50;
      this.metrics.areasStatus[area].count = Math.max(0, 
        Math.min(this.metrics.areasStatus[area].capacity, 
        this.metrics.areasStatus[area].count + change)
      );
      
      const ratio = this.metrics.areasStatus[area].count / this.metrics.areasStatus[area].capacity;
      this.metrics.areasStatus[area].status = 
        ratio > 0.9 ? 'critical' :
        ratio > 0.7 ? 'high' :
        ratio > 0.4 ? 'medium' : 'low';
    });
  }

  private notifyListeners(event: string, data: any) {
    this.listeners.forEach(listener => listener({ event, data }));
  }

  // User actions that create reports
  submitReport(report: Omit<UserReport, 'id' | 'timestamp'>): string {
    const newReport: UserReport = {
      ...report,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    
    this.reports.unshift(newReport);
    this.notifyListeners('newReport', newReport);
    
    return newReport.id;
  }

  // Admin actions
  updateReportStatus(reportId: string, status: UserReport['status'], notes: string = '') {
    const report = this.reports.find(r => r.id === reportId);
    if (report) {
      report.status = status;
      
      const action: AdminAction = {
        id: Date.now().toString(),
        reportId,
        action: status === 'resolved' ? 'resolved' : 'acknowledged',
        notes,
        timestamp: new Date(),
      };
      
      this.actions.push(action);
      this.notifyListeners('reportUpdated', { report, action });
    }
  }

  assignReport(reportId: string, assignedTo: string, notes: string = '') {
    const report = this.reports.find(r => r.id === reportId);
    if (report) {
      report.status = 'in-progress';
      
      const action: AdminAction = {
        id: Date.now().toString(),
        reportId,
        action: 'assigned',
        notes,
        assignedTo,
        timestamp: new Date(),
      };
      
      this.actions.push(action);
      this.notifyListeners('reportAssigned', { report, action });
    }
  }

  // Data retrieval
  getReports(filter?: { status?: string; type?: string; priority?: string }) {
    let filtered = [...this.reports];
    
    if (filter?.status) {
      filtered = filtered.filter(r => r.status === filter.status);
    }
    if (filter?.type) {
      filtered = filtered.filter(r => r.type === filter.type);
    }
    if (filter?.priority) {
      filtered = filtered.filter(r => r.priority === filter.priority);
    }
    
    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  getMetrics(): LiveMetrics {
    return { ...this.metrics };
  }

  getRecentActions(limit: number = 10) {
    return this.actions
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  // Real-time subscriptions
  subscribe(listener: (data: any) => void) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Emergency broadcast
  broadcastEmergencyAlert(message: string, area?: string) {
    const alert = {
      id: Date.now().toString(),
      type: 'emergency-broadcast',
      message,
      area,
      timestamp: new Date(),
    };
    
    this.notifyListeners('emergencyAlert', alert);
    return alert;
  }

  // Crowd management
  redirectCrowdFlow(fromArea: string, toArea: string, reason: string) {
    const redirection = {
      id: Date.now().toString(),
      type: 'crowd-redirection',
      fromArea,
      toArea,
      reason,
      timestamp: new Date(),
    };
    
    this.notifyListeners('crowdRedirection', redirection);
    return redirection;
  }
}

// Singleton instance
export const adminDataService = new AdminDataService();

// Helper functions for components
export const submitUserReport = (report: Omit<UserReport, 'id' | 'timestamp'>) => {
  return adminDataService.submitReport(report);
};

export const getAdminMetrics = () => {
  return adminDataService.getMetrics();
};

export const subscribeToAdminUpdates = (callback: (data: any) => void) => {
  return adminDataService.subscribe(callback);
};
