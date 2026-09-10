const { withMainActivity, withMainApplication } = require('@expo/config-plugins');

/**
 * Expo Config Plugin to ensure WindowManager.LayoutParams.FLAG_SECURE
 * is preserved in MainActivity.kt and MainApplication.kt across prebuilds.
 */
const withSecureFlag = (config) => {
  config = withMainActivity(config, (modConfig) => {
    let contents = modConfig.modResults.contents;
    if (!contents.includes('FLAG_SECURE')) {
      if (!contents.includes('import android.view.WindowManager')) {
        contents = contents.replace(
          'import android.os.Bundle',
          'import android.os.Bundle\nimport android.view.WindowManager'
        );
      }
      contents = contents.replace(
        'super.onCreate(null)',
        'window.setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE)\n    super.onCreate(null)'
      );
      modConfig.modResults.contents = contents;
    }
    return modConfig;
  });

  config = withMainApplication(config, (modConfig) => {
    let contents = modConfig.modResults.contents;
    if (!contents.includes('FLAG_SECURE')) {
      if (!contents.includes('import android.view.WindowManager')) {
        contents = contents.replace(
          'import android.app.Application',
          'import android.app.Activity\nimport android.app.Application\nimport android.os.Bundle\nimport android.view.WindowManager'
        );
      }
      contents = contents.replace(
        'super.onCreate()',
        `super.onCreate()
    registerActivityLifecycleCallbacks(object : ActivityLifecycleCallbacks {
      override fun onActivityCreated(activity: Activity, savedInstanceState: Bundle?) {
        activity.window.setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE)
      }
      override fun onActivityStarted(activity: Activity) {}
      override fun onActivityResumed(activity: Activity) {
        activity.window.setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE)
      }
      override fun onActivityPaused(activity: Activity) {}
      override fun onActivityStopped(activity: Activity) {}
      override fun onActivitySaveInstanceState(activity: Activity, outState: Bundle) {}
      override fun onActivityDestroyed(activity: Activity) {}
    })`
      );
      modConfig.modResults.contents = contents;
    }
    return modConfig;
  });

  return config;
};

module.exports = withSecureFlag;
