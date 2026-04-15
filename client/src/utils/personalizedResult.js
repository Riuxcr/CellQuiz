/**
 * Maps quiz answers to personalized copy (skincare 3×2 + longevity activity tiers).
 */

export function getPersonalizedInsight(answers) {
  if (!answers || typeof answers !== 'object') return null

  const goal = answers.goal

  // --- SKINCARE PATH ---
  if (goal === 'Skincare & anti-aging') {
    const hasRoutine = answers.routine === 'Yes'
    const seenDerm = answers.dermatologist === 'Yes'

    // Case: YES Routine | YES Derm
    if (hasRoutine && seenDerm) {
      return {
        trackKey: 'skincare_routine_yes_derm_yes',
        categoryLabel: 'SKINCARE / ANTI-AGING RESULTS',
        headline: 'You’re Taking a Proactive Approach to Skin Health',
        body: 'Your answers show that you’re already investing in your skin with professional guidance and a consistent routine. That’s a great foundation for maintaining healthy-looking skin over time. Many people complement topical skincare with nutrients that support cellular processes linked to skin vitality. Add ChronoNAD+ to support cellular energy and long-term skin wellness.'
      }
    }

    // Case: YES Routine | NO Derm
    if (hasRoutine && !seenDerm) {
      return {
        trackKey: 'skincare_routine_yes_derm_no',
        categoryLabel: 'SKINCARE / ANTI-AGING RESULTS',
        headline: 'You’ve Started a Good Routine',
        body: 'Your answers show that you’ve built a skincare routine, which is an important step toward maintaining healthy-looking skin. However, skin health is influenced by both external care and internal cellular processes. Supporting your body at the cellular level may help maintain long-term skin vitality. Discover ChronoNAD+ to complement your skincare routine.'
      }
    }

    // Case: NO Routine | YES Derm
    if (!hasRoutine && seenDerm) {
      return {
        trackKey: 'skincare_routine_no_derm_yes',
        categoryLabel: 'SKINCARE / ANTI-AGING RESULTS',
        headline: 'Professional Guidance Is a Strong Start',
        body: 'You’ve taken the right step with expert advice, but consistency can still be built over time. Supporting your skin internally can make a real difference. ChronoNAD+ boosts NAD+ levels, helping with cellular repair, energy, and overall skin vitality. It’s an easy addition to complement your progress.'
      }
    }

    // Case: NO Routine | NO Derm
    return {
      trackKey: 'skincare_routine_no_derm_no',
      categoryLabel: 'SKINCARE / ANTI-AGING RESULTS',
      headline: 'Your Skin May Need More Consistent Support',
      body: 'Your answers suggest you may not yet have a structured approach to supporting your skin. Daily habits, environmental exposure, and natural aging can impact how skin looks and feels over time. While topical care is important, skin health is also connected to what happens inside your cells. Support your skin from within with ChronoNAD+, formulated to support cellular energy and healthy aging.'
    }
  }

  // --- LONGEVITY PATH ---
  if (goal === 'Longevity & cellular repair') {
    const active = answers.active

    if (active === 'Highly Active') {
      return {
        trackKey: 'longevity_highly_active',
        categoryLabel: 'LONGEVITY / ACTIVITY RESULTS',
        headline: 'Your Body Is Performing at a High Level',
        body: 'Your answers show a strong commitment to staying active and supporting your long-term health. Regular activity places unique demands on the body’s energy systems and recovery processes. Supporting cellular energy can help maintain balance and vitality. Support your routine with ChronoNAD+.'
      }
    }

    if (active === 'Moderately Active') {
      return {
        trackKey: 'longevity_mildly_active',
        categoryLabel: 'LONGEVITY / ACTIVITY RESULTS',
        headline: 'You’re On the Right Track',
        body: 'Your answers indicate a moderate level of activity, which is a great step toward supporting overall wellness and longevity. Maintaining cellular energy and healthy metabolic function can help you stay consistent with your routine. Support your active lifestyle with ChronoNAD+.'
      }
    }

    // Default for Lightly Active or Sedentary
    return {
      trackKey: 'longevity_not_very_active',
      categoryLabel: 'LONGEVITY / ACTIVITY RESULTS',
      headline: 'Your Body May Benefit from Additional Support',
      body: 'Your answers suggest that your current activity level may be lower than recommended for supporting long-term health and vitality. Physical activity plays a role in cellular function and energy metabolism. Supporting your body with the right lifestyle choices — including nutrition — can help maintain overall wellness. Support your cells daily with ChronoNAD+.'
    }
  }

  // Final Fallback
  return {
    trackKey: 'default',
    categoryLabel: 'YOUR PROTOCOL',
    headline: 'Your Personalized Cellular Support',
    body: 'Thank you for completing the analysis. ChronoNAD+ is formulated to support cellular energy and healthy aging—whether your focus is skin vitality, longevity, or overall wellness.'
  }
}

export function getHeroImageForAnswers(answers) {
  return '/Result.png'
}
