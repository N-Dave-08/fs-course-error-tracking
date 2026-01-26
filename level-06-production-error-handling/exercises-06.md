# Exercises 06: Production Error Handling

## Learning Objectives

By completing these exercises, you will:
- ✅ Monitor error metrics
- ✅ Set up alerting systems
- ✅ Analyze error patterns
- ✅ Track error trends
- ✅ Generate error reports
- ✅ Practice production error management

## Before You Start

**Prerequisites:**
- Sentry integration (Level 5)
- Production deployment knowledge
- Monitoring concepts
- Alerting systems

**Setup:**
1. Navigate to `fs-course-error-tracking/level-06-production-error-handling/`
2. Ensure monitoring tools are set up
3. All exercises should be created in `src/`

---

## Exercise 1: Error Monitoring

**Objective:** Implement error monitoring.

**Instructions:**
Create `src/monitoring/error-monitor.ts`:
1. Track error metrics
2. Monitor error rates
3. Create dashboard

**Expected Code Structure:**
```typescript
// src/monitoring/error-monitor.ts
interface ErrorMetrics {
  totalErrors: number;
  errorRate: number;
  errorsByType: Record<string, number>;
  errorsByEndpoint: Record<string, number>;
}

class ErrorMonitor {
  private errors: Array<{ type: string; endpoint: string; timestamp: Date }> = [];

  recordError(type: string, endpoint: string) {
    this.errors.push({ type, endpoint, timestamp: new Date() });
  }

  getMetrics(timeWindow: number = 3600000): ErrorMetrics {
    const windowStart = new Date(Date.now() - timeWindow);
    const recentErrors = this.errors.filter(e => e.timestamp >= windowStart);

    const errorsByType: Record<string, number> = {};
    const errorsByEndpoint: Record<string, number> = {};

    recentErrors.forEach(error => {
      errorsByType[error.type] = (errorsByType[error.type] || 0) + 1;
      errorsByEndpoint[error.endpoint] = (errorsByEndpoint[error.endpoint] || 0) + 1;
    });

    return {
      totalErrors: recentErrors.length,
      errorRate: recentErrors.length / (timeWindow / 1000 / 60), // errors per minute
      errorsByType,
      errorsByEndpoint,
    };
  }
}

export default new ErrorMonitor();
```

**Verification:**
- Metrics tracked
- Error rates calculated
- Dashboard data available

**File:** `src/monitoring/error-monitor.ts`

---

## Exercise 2: Alerting

**Objective:** Set up alerting system.

**Instructions:**
Create `src/alerting/alert-manager.ts`:
1. Configure thresholds
2. Set up alert channels
3. Test alerts

**Expected Code Structure:**
```typescript
// src/alerting/alert-manager.ts
import errorMonitor from '../monitoring/error-monitor';

interface AlertConfig {
  errorRateThreshold: number;
  errorCountThreshold: number;
  alertChannels: string[];
}

class AlertManager {
  private config: AlertConfig = {
    errorRateThreshold: 10, // errors per minute
    errorCountThreshold: 50, // total errors
    alertChannels: ['email', 'slack'],
  };

  checkAlerts() {
    const metrics = errorMonitor.getMetrics();

    if (metrics.errorRate > this.config.errorRateThreshold) {
      this.sendAlert('High error rate detected', metrics);
    }

    if (metrics.totalErrors > this.config.errorCountThreshold) {
      this.sendAlert('High error count detected', metrics);
    }
  }

  private sendAlert(message: string, metrics: any) {
    // Send to configured channels
    console.log('ALERT:', message, metrics);
  }
}

export default new AlertManager();
```

**Verification:**
- Alerts configured
- Thresholds work
- Alerts sent correctly

**File:** `src/alerting/alert-manager.ts`

---

## Exercise 3: Error Analysis

**Objective:** Implement error analysis.

**Instructions:**
Create `src/analysis/error-analyzer.ts`:
1. Group errors
2. Track trends
3. Generate reports

**Expected Code Structure:**
```typescript
// src/analysis/error-analyzer.ts
import errorMonitor from '../monitoring/error-monitor';

class ErrorAnalyzer {
  groupErrors() {
    const metrics = errorMonitor.getMetrics();
    
    return {
      byType: metrics.errorsByType,
      byEndpoint: metrics.errorsByEndpoint,
      topErrors: Object.entries(metrics.errorsByType)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5),
    };
  }

  generateReport() {
    const grouped = this.groupErrors();
    const metrics = errorMonitor.getMetrics();

    return {
      summary: {
        totalErrors: metrics.totalErrors,
        errorRate: metrics.errorRate,
      },
      breakdown: grouped,
      recommendations: this.getRecommendations(metrics),
    };
  }

  private getRecommendations(metrics: any): string[] {
    const recommendations: string[] = [];
    
    if (metrics.errorRate > 10) {
      recommendations.push('Error rate is high - investigate immediately');
    }

    return recommendations;
  }
}

export default new ErrorAnalyzer();
```

**Verification:**
- Errors grouped correctly
- Trends tracked
- Reports generated

**File:** `src/analysis/error-analyzer.ts`

---

## Running Exercises

```bash
npx ts-node src/monitoring/error-monitor.ts
npx ts-node src/alerting/alert-manager.ts
npx ts-node src/analysis/error-analyzer.ts
```

## Verification Checklist

- [ ] Error monitoring works
- [ ] Alerting works
- [ ] Error analysis works
- [ ] Reports generated
- [ ] Trends tracked

## Next Steps

1. ✅ **Review**: Understand production error handling
2. ✅ **Experiment**: Add more features
3. 📖 **Complete**: Review all error tracking levels
4. 💻 **Reference**: Check `project/` folder

---

**Key Takeaways:**
- Monitor error metrics continuously
- Set up alerts for critical errors
- Analyze error patterns regularly
- Track trends over time
- Generate reports for stakeholders
- Act on error insights

**Good luck! Happy coding! 🚀**
