/**
 * @jest-environment jsdom
 */
import Multistage from '../src/core';
import { generateStages } from './helpers';
import { expect, jest, test } from '@jest/globals';

afterEach(() => {
    jest.clearAllMocks();
});

test('Initialize with string', () => {
    let consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => { });

    document.body.innerHTML = generateStages(0);
    const instance = new Multistage('#multistage');

    expect(instance).not.toBeNull();
    expect(consoleSpy).not.toHaveBeenCalled();
});

test('Initialize with node', () => {
    let consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => { });

    document.body.innerHTML = generateStages(0);
    const instance = new Multistage(document.querySelector('#multistage'));

    expect(instance).not.toBeNull();
    expect(consoleSpy).not.toHaveBeenCalled();
});

test('Initialize with null', () => {
    let consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => { });

    document.body.innerHTML = generateStages(0);
    const instance = new Multistage(null);

    expect(instance).not.toBeNull();
    expect(consoleSpy).toHaveBeenCalled();
});

test('Initialize with number', () => {
    let consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => { });

    document.body.innerHTML = generateStages(0);
    const instance = new Multistage(1337);

    expect(instance).not.toBeNull();
    expect(consoleSpy).toHaveBeenCalled();
});