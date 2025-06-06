#!/bin/bash

# Script to build APK for CatFlix

echo "Building CatFlix APK..."

# Create the BuildConfig class
mkdir -p android/app/src/main/java/com/catflix/app
cat > android/app/src/main/java/com/catflix/app/BuildConfig.java << EOF
package com.catflix.app;

public class BuildConfig {
    public static final boolean DEBUG = Boolean.parseBoolean("true");
    public static final String APPLICATION_ID = "com.catflix.app";
    public static final String BUILD_TYPE = "debug";
    public static final int VERSION_CODE = 1;
    public static final String VERSION_NAME = "1.0";
}
EOF

# Go to android directory
cd android

# Give execute permission to gradlew
chmod +x gradlew

# Build the APK
./gradlew assembleDebug

echo ""
echo "APK build completed!"
echo "Your APK should be at: android/app/build/outputs/apk/debug/app-debug.apk"