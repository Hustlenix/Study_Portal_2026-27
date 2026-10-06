#include <algorithm>
#include <cmath>
#ifdef __EMSCRIPTEN__
#include <emscripten/emscripten.h>
#define KEEP EMSCRIPTEN_KEEPALIVE
#else
#define KEEP
#endif

extern "C" {

KEEP int adaptive_weight(int correct, int wrong, int streak, int days_since_review) {
    correct=std::max(0,correct); wrong=std::max(0,wrong); streak=std::max(0,streak);
    days_since_review=std::clamp(days_since_review,0,30);
    const int attempts=correct+wrong;
    const double accuracy=attempts ? static_cast<double>(correct)/attempts : 0.45;
    double weight=100.0 + wrong*22.0 + (1.0-accuracy)*95.0
        + std::min(days_since_review,14)*4.0 - std::min(streak,8)*7.0;
    if(!attempts) weight+=55.0;
    return std::max(10,static_cast<int>(std::lround(weight)));
}

KEEP int mastery_score(int correct, int wrong, int streak) {
    correct=std::max(0,correct); wrong=std::max(0,wrong); streak=std::max(0,streak);
    const int attempts=correct+wrong;
    if(!attempts) return 0;
    const double score=(100.0*correct/attempts)+std::min(streak,5)*3.0;
    return std::clamp(static_cast<int>(std::lround(score)),0,100);
}

// Returns a suggested number of days before this topic should be reviewed again.
KEEP int next_interval_days(int mastery, int streak, int wrong) {
    mastery=std::clamp(mastery,0,100); streak=std::max(0,streak); wrong=std::max(0,wrong);
    if(mastery<40 || wrong>streak+2) return 0;
    if(mastery<60) return 1;
    if(mastery<75) return std::min(3,1+streak/2);
    if(mastery<90) return std::min(7,2+streak);
    return std::min(14,5+streak*2);
}

// Lightweight rubric score for a spoken viva answer.
// Keyword coverage carries most of the score; sufficient spoken length adds a small bonus.
KEEP int viva_score(int keyword_hits, int total_keywords, int word_count) {
    keyword_hits=std::max(0,keyword_hits);
    total_keywords=std::max(1,total_keywords);
    word_count=std::max(0,word_count);
    const double coverage=std::min(1.0,static_cast<double>(keyword_hits)/total_keywords);
    const double length_bonus=std::min(20.0,word_count*0.9);
    return std::clamp(static_cast<int>(std::lround(coverage*80.0+length_bonus)),0,100);
}

KEEP int written_self_score(int rubric_points_hit, int total_points, int self_rating) {
    rubric_points_hit=std::max(0,rubric_points_hit);
    total_points=std::max(1,total_points);
    self_rating=std::clamp(self_rating,0,3);
    const double coverage=std::min(1.0,static_cast<double>(rubric_points_hit)/total_points);
    return std::clamp(static_cast<int>(std::lround(coverage*75.0+self_rating*(25.0/3.0))),0,100);
}

}
