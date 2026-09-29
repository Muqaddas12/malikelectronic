package com.muqaddas123.malikelectronic

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class PlayStoreUpdatePackage : ReactPackage {
  override fun createNativeModules(context: ReactApplicationContext): List<NativeModule> = listOf(PlayStoreUpdateModule(context))
  override fun createViewManagers(context: ReactApplicationContext): List<ViewManager<*, *>> = emptyList()
}
