import { calculateBenefit } from '../benefitCalculator';
import { FamilyMember } from '../benefitCalculator';

describe('calculateBenefit', () => {
  it('should return not eligible if there are no children under 16', () => {
    const familyMembers: FamilyMember[] = [
      { name: 'Test Adult', age: 30, relation: 'self', income: 10000 },
    ];
    const result = calculateBenefit(familyMembers, 'bishkek', 10000);
    expect(result.eligible).toBe(false);
    expect(result.reason).toBe('No children under 16 years old');
  });

  it('should return not eligible if per capita income exceeds the GMD threshold', () => {
    const familyMembers: FamilyMember[] = [
      { name: 'Test Adult', age: 30, relation: 'self', income: 100000 },
      { name: 'Test Child', age: 10, relation: 'child', income: 0 },
    ];
    const result = calculateBenefit(familyMembers, 'bishkek', 100000);
    expect(result.eligible).toBe(false);
    expect(result.reason).toContain('exceeds GMD threshold');
  });

  it('should calculate the benefit correctly for an eligible family in a standard region', () => {
    const familyMembers: FamilyMember[] = [
      { name: 'Test Adult', age: 30, relation: 'self', income: 10000 },
      { name: 'Test Child', age: 10, relation: 'child', income: 0 },
    ];
    const result = calculateBenefit(familyMembers, 'bishkek', 10000);
    expect(result.eligible).toBe(true);
    expect(result.totalMonthlyBenefit).toBe(1200);
  });

  it('should apply the mountainous region coefficient', () => {
    const familyMembers: FamilyMember[] = [
        { name: 'Test Adult', age: 30, relation: 'self', income: 10000 },
        { name: 'Test Child', age: 10, relation: 'child', income: 0 },
    ];
    const result = calculateBenefit(familyMembers, 'naryn', 10000);
    expect(result.eligible).toBe(true);
    expect(result.totalMonthlyBenefit).toBe(1380); // 1200 * 1.15
  });

  it('should apply the border region coefficient and bonus', () => {
    const familyMembers: FamilyMember[] = [
        { name: 'Test Adult', age: 30, relation: 'self', income: 10000 },
        { name: 'Test Child', age: 10, relation: 'child', income: 0 },
    ];
    const result = calculateBenefit(familyMembers, 'batken', 10000);
    expect(result.eligible).toBe(true);
    expect(result.totalMonthlyBenefit).toBe(2728); // (1200 * 1.2 * 1.2) + 1000
  });

  it('should require supervisor approval if the benefit exceeds the threshold', () => {
    const familyMembers: FamilyMember[] = [
        { name: 'Test Adult', age: 30, relation: 'self', income: 10000 },
        { name: 'Test Child 1', age: 10, relation: 'child', income: 0 },
        { name: 'Test Child 2', age: 8, relation: 'child', income: 0 },
        { name: 'Test Child 3', age: 6, relation: 'child', income: 0 },
    ];
    const result = calculateBenefit(familyMembers, 'batken', 10000);
    expect(result.requiresSupervisorApproval).toBe(true);
  });
});
