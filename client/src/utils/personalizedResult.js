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
        body: 'You already follow a routine and have expert guidance, so you’re covering the basics well. To go further, supporting your skin at a cellular level is key. ChronoNAD+ helps boost NAD+ levels, promoting repair, energy, and long-term skin vitality. It’s an easy way to elevate the results you’re already achieving.'
      }
    }

    // Case: YES Routine | NO Derm
    if (hasRoutine && !seenDerm) {
      return {
        trackKey: 'skincare_routine_yes_derm_no',
        categoryLabel: 'SKINCARE / ANTI-AGING RESULTS',
        headline: 'You’ve Started a Good Routine',
        body: 'You have a routine in place, which is a great start, but deeper results come from within. Skin health is closely tied to cellular repair and energy levels. ChronoNAD+ supports this by boosting NAD+, helping improve overall vitality and visible skin health. It’s a simple upgrade to your current efforts.'
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
      body: 'You’re not currently following a routine or expert guidance, so starting from within can be effective. Healthy skin begins with strong cellular function and repair. ChronoNAD+ helps boost NAD+, supporting energy, recovery, and overall skin vitality. It’s a simple way to begin improving your skin from the inside out.'
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
