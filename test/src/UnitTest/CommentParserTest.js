import assert from 'power-assert';
import CommentParser from '../../../src/Parser/CommentParser.js';

describe('CommentParser:', ()=>{
  it('can parse doc comment.', ()=>{
    let value = `*
* this is desc.
* @tag1
* @tag2 tag2 value
* @tag3 tag3 value
* tag3 second value
*
* @tag4 tag4 value
*
`;
    let comment = {type: 'Block', value: value};
    let tags = CommentParser.parse(comment);
    assert.equal(tags.length, 5);
    assert.deepEqual(tags[0], {tagName: '@desc', tagValue: 'this is desc.'});
    assert.deepEqual(tags[1], {tagName: '@tag1', tagValue: ''});
    assert.deepEqual(tags[2], {tagName: '@tag2', tagValue: 'tag2 value'});
    assert.deepEqual(tags[3], {tagName: '@tag3', tagValue: 'tag3 value\ntag3 second value'});
    assert.deepEqual(tags[4], {tagName: '@tag4', tagValue: 'tag4 value'});
  });

  it('return empty with non doc comment.', ()=>{
    let value = `\
this is not doc comment.
`;
    let comment = {type: 'Block', value: value};
    let tags = CommentParser.parse(comment);
    assert.equal(tags.length, 0);
  });

  it('return empty with line comment.', ()=>{
    let value = `this is line comment.`;
    let comment = {type: 'Block', value: value};
    let tags = CommentParser.parse(comment);
    assert.equal(tags.length, 0);
  });
});