import React from 'react';

export default function MainContent() {
  return (
    <div className="bg-gray-50 p-8 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">קרבות ימי הביניים</h1>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        קרבות ימי הביניים והגנה עצמית בדרכת ישראל הטילקן. רכישת מיומנויות הגנה עצמית, שיפור כושר גופני, פיתוח קואורדינציה, ושליטה התמצאות במרחב. הגדלת כך פיוס ומשמעת עצמית.
        למגון מיילים במגון מקומות בלה בלה בלה.
      </p>
      <a
        href="/register"
        className="px-6 py-3 text-white bg-blue-700 rounded-md hover:bg-blue-800"
      >
        הרשמו עכשיו!
      </a>
    </div>
  );
}
