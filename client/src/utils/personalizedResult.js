/**
 * Maps quiz answers to personalized copy (skincare 3×2 + longevity activity tiers).
 */

export function getPersonalizedInsight(answers) {
  if (!answers || typeof answers !== 'object') return null

  const goal = answers.goal

  if (goal === 'Skincare & anti-aging') {
    const hasRoutine = answers.routine === 'Yes'
    const seenDerm = answers.dermatologist === 'Yes'

    if (!seenDerm && !hasRoutine) {
      return {
        trackKey: 'skincare_no_derm_no_routine',
        categoryLabel: 'Skincare / anti-aging results',
        headline: 'Your Skin May Need More Consistent Support',
        body:
          'Your answers suggest you may not yet have a structured approach to supporting your skin. Daily habits, environmental exposure, and natural aging can impact how skin looks and feels over time. While topical care is important, skin health is also connected to what happens inside your cells. Support your skin from within with ChronoNAD+, formulated to support cellular energy and healthy aging.',
      }
    }

    if (seenDerm && hasRoutine) {
      return {
        trackKey: 'skincare_derm_routine',
        categoryLabel: 'Skincare / anti-aging results',
        headline: 'You’re Taking a Proactive Approach to Skin Health',
        body:
          'Your answers show that you’re already investing in your skin with professional guidance and a consistent routine. That’s a great foundation for maintaining healthy-looking skin over time. Many people complement topical skincare with nutrients that support cellular processes linked to skin vitality. Add ChronoNAD+ to support cellular energy and long-term skin wellness.',
      }
    }

    if (!seenDerm && hasRoutine) {
      return {
        trackKey: 'skincare_no_derm_routine',
        categoryLabel: 'Skincare / anti-aging results',
        headline: 'You’ve Started a Good Routine',
        body:
          'Your answers show that you’ve built a skincare routine, which is an important step toward maintaining healthy-looking skin. However, skin health is influenced by both external care and internal cellular processes. Supporting your body at the cellular level may help maintain long-term skin vitality. Discover ChronoNAD+ to complement your skincare routine.',
      }
    }

    // Seen dermatologist, no daily routine — not in the 3 numbered cases; honest bridge copy.
    return {
      trackKey: 'skincare_derm_no_routine',
      categoryLabel: 'Skincare / anti-aging results',
      headline: 'Professional Guidance Is a Strong Start',
      body:
        'Your answers show you’ve consulted a dermatologist. Adding a consistent at-home routine can help you get the most from that care over time. Skin health also reflects internal cellular processes—many people layer in nutrients that support cellular energy alongside professional treatment. ChronoNAD+ is formulated to support cellular energy and healthy aging.',
    }
  }

  if (goal === 'Longevity & cellular repair') {
    const active = answers.active

    if (active === 'Highly Active') {
      return {
        trackKey: 'longevity_highly_active',
        categoryLabel: 'Longevity / activity results',
        headline: 'Your Body Is Performing at a High Level',
        body:
          'Your answers show a strong commitment to staying active and supporting your long-term health. Regular activity places unique demands on the body’s energy systems and recovery processes. Supporting cellular energy can help maintain balance and vitality. Support your routine with ChronoNAD+.',
      }
    }

    if (active === 'Moderately Active') {
      return {
        trackKey: 'longevity_moderate',
        categoryLabel: 'Longevity / activity results',
        headline: 'You’re On the Right Track',
        body:
          'Your answers indicate a moderate level of activity, which is a great step toward supporting overall wellness and longevity. Maintaining cellular energy and healthy metabolic function can help you stay consistent with your routine. Support your active lifestyle with ChronoNAD+.',
      }
    }

    // Lightly Active + Sedentary → "not very active" bucket
    if (active === 'Lightly Active' || active === 'Sedentary') {
      return {
        trackKey: 'longevity_low_activity',
        categoryLabel: 'Longevity / activity results',
        headline: 'Your Body May Benefit from Additional Support',
        body:
          'Your answers suggest that your current activity level may be lower than recommended for supporting long-term health and vitality. Physical activity plays a role in cellular function and energy metabolism. Supporting your body with the right lifestyle choices — including nutrition — can help maintain overall wellness. Support your cells daily with ChronoNAD+.',
      }
    }

    return {
      trackKey: 'longevity_default',
      categoryLabel: 'Longevity / activity results',
      headline: 'Support Your Cellular Energy',
      body:
        'Your answers point toward longevity and cellular repair as a priority. Daily habits, recovery, and nutrition all influence how your cells produce and use energy. ChronoNAD+ is formulated to support cellular energy and healthy aging as part of an overall wellness approach.',
    }
  }

  return {
    trackKey: 'default',
    categoryLabel: 'Your protocol',
    headline: 'Your Personalized Cellular Support',
    body:
      'Thank you for completing the analysis. ChronoNAD+ is formulated to support cellular energy and healthy aging—whether your focus is skin vitality, longevity, or overall wellness.',
  }
}

export function getHeroImageForAnswers(answers) {
  return '/Result.png'
}
