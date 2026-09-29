package com.muqaddas123.malikelectronic

import android.os.Build
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.google.android.play.core.appupdate.AppUpdateManagerFactory
import com.google.android.play.core.install.model.UpdateAvailability

class PlayStoreUpdateModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
  override fun getName() = "PlayStoreUpdate"

  @ReactMethod
  fun checkForUpdate(promise: Promise) {
    try {
      val installed = context.packageManager.getPackageInfo(context.packageName, 0)
      val installedCode = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) installed.longVersionCode else installed.versionCode.toLong()
      AppUpdateManagerFactory.create(context).appUpdateInfo
        .addOnSuccessListener { info ->
          val availability = info.updateAvailability()
          if (availability == UpdateAvailability.UNKNOWN) {
            promise.reject("PLAY_UPDATE_UNKNOWN", "Google Play could not determine update availability")
          } else {
            val result = Arguments.createMap()
            result.putBoolean("updateAvailable", availability == UpdateAvailability.UPDATE_AVAILABLE || availability == UpdateAvailability.DEVELOPER_TRIGGERED_UPDATE_IN_PROGRESS)
            result.putString("currentVersion", installed.versionName ?: "")
            result.putDouble("currentVersionCode", installedCode.toDouble())
            result.putInt("versionCode", info.availableVersionCode())
            promise.resolve(result)
          }
        }
        .addOnFailureListener { error -> promise.reject("PLAY_UPDATE_FAILED", "Unable to check Google Play", error) }
    } catch (error: Exception) {
      promise.reject("PLAY_UPDATE_FAILED", "Unable to check Google Play", error)
    }
  }
}
