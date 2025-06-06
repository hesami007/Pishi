#!/bin/bash

# Script to set up the Android project for CatFlix

# Step 1: Eject the Expo project to get native code
echo "Setting up Android project for CatFlix..."

# Create android directory
mkdir -p android/app/src/main/java/com/catflix/app

# Create basic gradle configuration
mkdir -p android/gradle/wrapper

# Create root build.gradle
cat > android/build.gradle << EOF
buildscript {
    ext {
        buildToolsVersion = "34.0.0"
        minSdkVersion = 21
        compileSdkVersion = 34
        targetSdkVersion = 34
        ndkVersion = "25.1.8937393"
        kotlinVersion = "1.9.0"
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:8.1.2")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.9.0")
        classpath("com.facebook.react:react-native-gradle-plugin")
    }
}

allprojects {
    repositories {
        maven {
            url("$rootDir/../node_modules/react-native/android")
        }
        maven {
            url("$rootDir/../node_modules/jsc-android/dist")
        }
        mavenCentral {
            content {
                excludeGroup "com.facebook.react"
            }
        }
        google()
        maven { url 'https://www.jitpack.io' }
    }
}
EOF

# Create app build.gradle
cat > android/app/build.gradle << EOF
apply plugin: "com.android.application"
apply plugin: "org.jetbrains.kotlin.android"
apply plugin: "com.facebook.react"

import com.android.build.OutputFile

android {
    ndkVersion rootProject.ext.ndkVersion

    compileSdkVersion rootProject.ext.compileSdkVersion

    namespace "com.catflix.app"
    defaultConfig {
        applicationId "com.catflix.app"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
    }

    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}

dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation "com.facebook.react:react-android"
    implementation "com.facebook.react:hermes-android"
}

apply from: file("../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle");
applyNativeModulesAppBuildGradle(project)
EOF

# Create settings.gradle
cat > android/settings.gradle << EOF
rootProject.name = 'CatFlix'
apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle");
applyNativeModulesSettingsGradle(settings)
include ':app'
includeBuild('../node_modules/@react-native/gradle-plugin')
EOF

# Create gradle.properties
cat > android/gradle.properties << EOF
org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.enableJetifier=true
android.nonTransitiveRClass=true
EOF

# Create gradle-wrapper.properties
cat > android/gradle/wrapper/gradle-wrapper.properties << EOF
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-8.3-all.zip
networkTimeout=10000
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
EOF

# Create gradlew script
cat > android/gradlew << EOF
#!/usr/bin/env sh

exec java -classpath "\$APP_HOME/gradle/wrapper/gradle-wrapper.jar" org.gradle.wrapper.GradleWrapperMain "\$@"
EOF

# Make gradlew executable
chmod +x android/gradlew

# Create MainActivity.java
cat > android/app/src/main/java/com/catflix/app/MainActivity.java << EOF
package com.catflix.app;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {
  @Override
  protected String getMainComponentName() {
    return "CatFlix";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        false
    );
  }
}
EOF

# Create MainApplication.java
cat > android/app/src/main/java/com/catflix/app/MainApplication.java << EOF
package com.catflix.app;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, false);
  }
}
EOF

# Create AndroidManifest.xml
mkdir -p android/app/src/main
cat > android/app/src/main/AndroidManifest.xml << EOF
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />

    <application
      android:name=".MainApplication"
      android:label="@string/app_name"
      android:icon="@mipmap/ic_launcher"
      android:roundIcon="@mipmap/ic_launcher_round"
      android:allowBackup="false"
      android:theme="@style/AppTheme">
      <activity
        android:name=".MainActivity"
        android:label="@string/app_name"
        android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|screenSize|smallestScreenSize|uiMode"
        android:launchMode="singleTask"
        android:windowSoftInputMode="adjustResize"
        android:exported="true">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
      </activity>
    </application>
</manifest>
EOF

# Create strings.xml
mkdir -p android/app/src/main/res/values
cat > android/app/src/main/res/values/strings.xml << EOF
<resources>
    <string name="app_name">CatFlix</string>
</resources>
EOF

# Create styles.xml
cat > android/app/src/main/res/values/styles.xml << EOF
<resources>
    <style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
        <item name="android:windowBackground">@color/app_bg</item>
    </style>
</resources>
EOF

# Create colors.xml
cat > android/app/src/main/res/values/colors.xml << EOF
<resources>
    <color name="app_bg">#121212</color>
</resources>
EOF

# Create ic_launcher placeholder
mkdir -p android/app/src/main/res/mipmap-xxxhdpi
touch android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png
touch android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png

echo "Android project setup complete! You can now open this project in Android Studio."
echo "To build the APK, run: cd android && ./gradlew assembleRelease"