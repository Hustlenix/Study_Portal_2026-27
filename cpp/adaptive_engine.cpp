#include <algorithm>
#include <cmath>
#ifdef __EMSCRIPTEN__
#include <emscripten/emscripten.h>
#define KEEP EMSCRIPTEN_KEEPALIVE
#else
#define KEEP
#endif

extern "C" {

// Higher score = higher priority for the next drill.
// Weakness, recent mistakes and time since last review all raise priority.
KEEP int adaptive_weight(int correct, int wrong, int streak, int days_since_review) {
    correct = std::max(0, correct);
    wrong = std::max(0, wrong);
    streak = std::max(0, streak);
    days_since_review = std::clamp(days_since_review, 0, 30);

    const int attempts = correct + wrong;
    const double accuracy = attempts ? static_cast<double>(correct) / attempts : 0.45;
    double weight = 100.0;
    weight += wrong * 22.0;
    weight += (1.0 - accuracy) * 95.0;
    weight += std::min(days_since_review, 14) * 4.0;
    weight -= std::min(streak, 8) * 7.0;
    if (attempts == 0) weight += 55.0;
    return std::max(10, static_cast<int>(std::lround(weight)));
}

KEEP int mastery_score(int correct, int wrong, int streak) {
    correct = std::max(0, correct);
    wrong = std::max(0, wrong);
    streak = std::max(0, streak);
    const int attempts = correct + wrong;
    if (!attempts) return 0;
    double score = (100.0 * correct / attempts) + std::min(streak, 5) * 3.0;
    return std::clamp(static_cast<int>(std::lround(score)), 0, 100);
}

}
