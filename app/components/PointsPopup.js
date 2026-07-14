"use client";

export default function PointsPopup({ points }) {
  if (points == null) return null;
  return <div id="pointsPopup">✨ +{points} Points!</div>;
}
