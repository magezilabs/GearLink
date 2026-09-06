import { describe, it, expect } from 'vitest';
import { findEquipmentList, findEquipmentById } from '../../src/modules/equipment';

describe('Equipment Repository (Pure Functional)', () => {
  it('should export pure repository functions', () => {
    expect(typeof findEquipmentList).toBe('function');
    expect(typeof findEquipmentById).toBe('function');
  });

  it('should return array structure for equipment list query', async () => {
    const list = await findEquipmentList();
    expect(Array.isArray(list)).toBe(true);
  });
});
