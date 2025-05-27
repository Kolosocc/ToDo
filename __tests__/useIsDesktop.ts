import { renderHook, act } from '@testing-library/react';
import * as HookModule from '@/app/hooks/useIsDesktop';

const useIsDesktop = HookModule.useIsDesktop;

const mockWindowWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  window.dispatchEvent(new Event('resize'));
};

describe('useIsDesktop', () => {
  beforeEach(() => {
    mockWindowWidth(1024);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return true when window width is >= breakpoint', () => {
    const { result } = renderHook(() => useIsDesktop(1000));
    expect(result.current).toBe(true);
  });

  test('should return false when window width is < breakpoint', () => {
    mockWindowWidth(800);
    const { result } = renderHook(() => useIsDesktop(1000));
    expect(result.current).toBe(false);
  });

  test('should update isDesktop on window resize', () => {
    const { result } = renderHook(() => useIsDesktop(1000));
    expect(result.current).toBe(true);

    act(() => {
      mockWindowWidth(800);
    });
    expect(result.current).toBe(false);

    act(() => {
      mockWindowWidth(1200);
    });
    expect(result.current).toBe(true);
  });

  test('should use default breakpoint of 1000', () => {
    mockWindowWidth(999);
    const { result } = renderHook(() => useIsDesktop());
    expect(result.current).toBe(false);

    act(() => {
      mockWindowWidth(1000);
    });
    expect(result.current).toBe(true);
  });

  test('should cleanup event listener on unmount', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useIsDesktop(1000));
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    );

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    );
  });

  test('should handle negative breakpoint', () => {
    mockWindowWidth(500);
    const { result } = renderHook(() => useIsDesktop(-100));
    expect(result.current).toBe(true);
  });

  test('should return true when window width equals breakpoint', () => {
    mockWindowWidth(1000);
    const { result } = renderHook(() => useIsDesktop(1000));
    expect(result.current).toBe(true);
  });

  test('should handle rapid resize events', () => {
    const { result } = renderHook(() => useIsDesktop(1000));
    expect(result.current).toBe(true);

    act(() => {
      mockWindowWidth(800);
      mockWindowWidth(900);
      mockWindowWidth(600);
    });
    expect(result.current).toBe(false);
  });

  test('should reflect correct initial state based on window width', () => {
    mockWindowWidth(500);
    const { result } = renderHook(() => useIsDesktop(1000));
    expect(result.current).toBe(false);
  });
});
