/**
 * @jest-environment jsdom
 */
import Multistage from '../src/core';
import { generateStages } from './helpers';
import { expect, jest, test } from '@jest/globals';

afterEach(() => {
    jest.clearAllMocks();
});

test('Increment one stage with default events', () => {
    document.body.innerHTML = generateStages(3, [`<button data-multistage-action="+1"></button>`]);
    let instance = new Multistage('#multistage');

    document.querySelector(".stage:nth-child(1) > button").click();

    expect(instance.activeIndex).toBe(1);
});

test('Increment one stage with custom events', () => {
    document.body.innerHTML = generateStages(3, [`<button data-multistage-action="+1" data-multistage-events="focus"></button>`]);
    let instance = new Multistage('#multistage');

    let btn = document.querySelector(".stage:nth-child(1) > button");
    
    btn.click();
    expect(instance.activeIndex).toBe(0);
    
    btn.focus();
    expect(instance.activeIndex).toBe(1);
});

test('Increment past boundry with no looping', () => {
    let consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => { });

    document.body.innerHTML = generateStages(2, [`<button data-multistage-action="+1"></button>`]);
    let instance = new Multistage('#multistage');
    instance.loop = false;

    let btn = document.querySelector(".stage:nth-child(1) > button");
    btn.click();
    btn.click();

    expect(instance.activeIndex).toBe(1);
    expect(consoleSpy).toHaveBeenCalled();
});

test('Increment past boundry with looping', () => {
    let consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => { });

    document.body.innerHTML = generateStages(2, [`<button data-multistage-action="+1"></button>`]);
    let instance = new Multistage('#multistage');
    instance.loop = true;

    let btn = document.querySelector(".stage:nth-child(1) > button");
    btn.click();
    btn.click();

    expect(instance.activeIndex).toBe(0);
    expect(consoleSpy).not.toHaveBeenCalled();
});

test('Decrement past boundry with no looping', () => {
    let consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => { });

    document.body.innerHTML = generateStages(2, [`<button data-multistage-action="-1"></button>`]);
    let instance = new Multistage('#multistage');
    instance.loop = false;

    let btn = document.querySelector(".stage:nth-child(1) > button");
    btn.click();

    expect(instance.activeIndex).toBe(0);
    expect(consoleSpy).toHaveBeenCalled();
});

test('Decrement past boundry with looping', () => {
    let consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => { });

    document.body.innerHTML = generateStages(2, [`<button data-multistage-action="-1"></button>`]);
    let instance = new Multistage('#multistage');
    instance.loop = true;

    let btn = document.querySelector(".stage:nth-child(1) > button");
    btn.click();

    expect(instance.activeIndex).toBe(1);
    expect(consoleSpy).not.toHaveBeenCalled();
});