# CatFlix APK Build Instructions

To build an APK for CatFlix, follow these steps:

## Option 1: Using Expo EAS (Recommended)

1. **Install EAS CLI globally**
   ```
   npm install -g eas-cli
   ```

2. **Log in to your Expo account**
   ```
   eas login
   ```

3. **Configure the build**
   The `eas.json` file is already set up for you.

4. **Build the APK**
   ```
   eas build -p android --profile preview
   ```
   This will start a build process on Expo's servers and provide a link to download the APK when done.

## Option 2: Using Android Studio

1. **Install Android Studio**: Download and install from https://developer.android.com/studio

2. **Generate native Android project**
   ```
   npx expo prebuild -p android
   ```

3. **Open the project in Android Studio**
   - Open Android Studio
   - Select "Open an existing Android Studio project"
   - Navigate to your project's android folder
   - Click Open

4. **Build the APK**
   - In Android Studio, go to Build → Build Bundle(s) / APK(s) → Build APK(s)
   - Android Studio will show a notification when the APK is built
   - Click on "locate" to find the APK file

## Option 3: Using Expo Development Build

If you just want to test the app on your Android device:

1. **Install Expo Go on your Android device** from the Google Play Store

2. **Start the development server**
   ```
   npm start
   ```

3. **Scan the QR code** with your Android device to open the app in Expo Go

This will let you test the app without needing to build an APK.