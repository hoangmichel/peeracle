/*
 * Copyright (c) 2015 peeracle contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
/* eslint-disable */

'use strict';

if (typeof Peeracle === 'undefined') {
  var Peeracle = require('..');
}

var dataStreams = ['MemoryDataStream'];
/*, 'FileDataStream', 'HttpDataStream'];*/

describe('DataStream', function () {
  for (var dataStream in dataStreams) {
    if (!dataStreams.hasOwnProperty(dataStream)) {
      continue;
    }

    executeDataStreamTest(dataStreams[dataStream]);
  }
});

function executeDataStreamTest(dataStreamName) {
  describe(dataStreamName + '\'s', function () {
    var dataStream;

    beforeEach(function () {
      if (dataStreamName === 'MemoryDataStream') {
        dataStream = new Peeracle[dataStreamName]({
          buffer: new Uint8Array(32)
        });
      }
    });

    describe('constructor', function () {
      if (dataStreamName === 'MemoryDataStream') {
        it('should try to be called without arguments and throw an error',
          function () {
              var createWithEmptyArguments = function () {
              new Peeracle.MemoryDataStream();
            };

            expect(createWithEmptyArguments).toThrow(jasmine.any(TypeError));
          });

        it('should try to be called with an empty object and throw an error',
          function () {
            var createWithEmptyObject = function () {
              new Peeracle.MemoryDataStream();
            };

            expect(createWithEmptyObject).toThrow(jasmine.any(TypeError));
          });

        it('should be called successfully with a valid buffer',
          function () {
            var dataStream;
            expect(function () {
              dataStream = new Peeracle.MemoryDataStream({
                buffer: new Uint8Array(1)
              });
            }).not.toThrow();

            expect(dataStream).not.toBeNull();
            expect(dataStream).toEqual(jasmine.any(Peeracle.DataStream));
            expect(dataStream).toEqual(jasmine.any(Peeracle.MemoryDataStream));
          });
      }
    });
    describe('length', function () {
      it('should return length', function () {
        expect(dataStream.length()).toEqual(jasmine.any
        (Peeracle.MemoryDataStream.buffer.length));
      });
    });
    describe('tell', function () {
      it('should return offset', function () {
        expect(dataStream.tell()).toEqual(0);
      });
    });

    describe('seek', function () {
      it('should call seek with an object and throw an type error',
        function () {
        expect(function () {
          dataStream.seek('a');
        }).toThrow(jasmine.any(TypeError));
      });
      it('should call seek with an object and throw an range error',
        function () {
        expect(function () {
          dataStream.seek(-1);
        }).toThrow(jasmine.any(RangeError));
          expect(function () {
            dataStream.seek(6);
          }).toThrow(jasmine.any(RangeError));
      });
    });

    describe('read', function () {
      it('should call read with two objects',
        function () {
          var callback = jasmine.createSpy('callback');

          expect(dataStream.read(-1, callback)).toThrow(jasmine.any(RangeError));
        });
      it('should call read',
        function () {
          expect(dataStream.read({})).toHaveBeenCalled();
        });
    });

    describe('readChar', function () {
      it('should call readChar with two objects and throw error',
        function () {
          var callback = jasmine.createSpy('callback');

          expect(dataStream.readChar(callback)).toThrow(jasmine.any(RangeError));
        });
    });

    describe('peek', function () {
      it('should call peek with two objects and throw error',
        function () {
          var callback = jasmine.createSpy('callback');

          expect(dataStream.peek(-1, callback)).toThrow(jasmine.any(RangeError));

        });
      it('should call peek',
        function () {
          expect(dataStream.peek({})).toHaveBeenCalled();
        });
    });

    describe('peekChar', function () {
      it('should call peekChar with callback',
        function () {
          var callback = jasmine.createSpy('callback');
          expect(dataStream.peekChar(callback)).toHaveBeenCalled();
        });
    });

    describe('write', function () {
      it('should call write with two objects and throw type error',
        function () {
          var callback = jasmine.createSpy('callback');

          expect(dataStream.write('a', callback)).toThrow(jasmine.any(TypeError));
        });
      it('should call write with two objects and throw range error',
        function () {
          var callback = jasmine.createSpy('callback');

          expect(dataStream.write(new Uint8Array(1), callback)).toThrow(jasmine.any(RangeError));
        });
    });
  });
}